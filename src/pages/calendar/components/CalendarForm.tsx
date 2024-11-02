import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import CalendarTable from './CalendarTable';
import { CalendarTask } from './Task';
import { addDays, format, isValid, parse, startOfDay } from "date-fns";
import Downloads from "./Downloads";
import Loading from "../../../components/loading/Loading";
import { HApiTask, loadTasks } from "../../../apis/hering-api";
import i18n from "i18next";
import './calendar-form.less'
import { Tooltip } from 'react-tooltip'
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const dateFormat = 'yyyy-MM-dd'
const initialStartDate = format(Date.now(), dateFormat)
const initialResponsible = 'all'
const initialPuffer = 0;

const startDateCacheKey = 'start-date'
const responsibleCacheKey = 'responsible'
const bufferCacheKey = 'buffer'
const calendarDesignationCacheKey = 'calendar-designation'

function CalendarForm() {

    const { t } = useTranslation()

    const defaultCalendarDesignation = t('calendarPage.defaultDesignation');

    const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true)
    const [isUpdatingTasks, setIsUpdatingTasks] = useState<boolean>(true)
    const [startDate, setStartDate] = useState<string>(initialStartDate)
    const [parsedStartDate, setParsedStartDate] = useState<Date>(new Date())
    const [responsible, setResponsible] = useState<string>(initialResponsible)
    const [puffer, setPuffer] = useState<number>(initialPuffer)
    const [designation, setDesignation] = useState<string>(defaultCalendarDesignation)
    const [taskList, setTaskList] = useState<HApiTask[] | undefined>(undefined)
    const [calendarTasks, setCalendarTasks] = useState<CalendarTask[]>([])

    const onStartDateChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const newStartDate = e.currentTarget.value
        setStartDate(newStartDate)
        window.sessionStorage.setItem(startDateCacheKey, newStartDate)
    }

    const onResponsibleeChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        const newResponsible = e.currentTarget.value
        setResponsible(newResponsible)
        window.sessionStorage.setItem(responsibleCacheKey, newResponsible);
    }

    const onBufferChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const newBuffer = parseInt(e.currentTarget.value) || initialPuffer;
        setPuffer(newBuffer)
        window.sessionStorage.setItem(bufferCacheKey, newBuffer.toString());
    }

    const onDesignationChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const newPrefix = e.currentTarget.value
        setDesignation(newPrefix)
        window.sessionStorage.setItem(calendarDesignationCacheKey, newPrefix);
    }

    const resetValues = () => {
        window.sessionStorage.removeItem(startDateCacheKey);
        setStartDate(initialStartDate)

        window.sessionStorage.removeItem(responsibleCacheKey);
        setResponsible(initialResponsible)

        window.sessionStorage.removeItem(bufferCacheKey);
        setPuffer(initialPuffer)

        window.sessionStorage.removeItem(calendarDesignationCacheKey);
        setDesignation(defaultCalendarDesignation)
    }

    const hasActiveCache = useCallback(() => {
        const calendarDesignationCache = window.sessionStorage.getItem(calendarDesignationCacheKey)

        return !!window.sessionStorage.getItem(startDateCacheKey)
            || !!window.sessionStorage.getItem(responsibleCacheKey)
            || !!window.sessionStorage.getItem(bufferCacheKey)
            || !!calendarDesignationCache
            || calendarDesignationCache?.length === 0

    }, [startDate, responsible, puffer, designation])

    useEffect(() => {
        const parsedStartDate = parse(startDate, dateFormat, Date.now())
        const isValidDate = isValid(parsedStartDate)
        if (isValidDate) {
            setParsedStartDate(parsedStartDate)
        }
    }, [startDate])

    useEffect(() => {
        const isValidDate = isValid(parsedStartDate)
        if (!isValidDate || !taskList) {
            return
        }

        // Introduce pseudo loading time so that the user sees that something is updating
        setIsUpdatingTasks(true);

        const filteredTasks = taskList.filter((task: HApiTask) => {
            const rollen = task.responsible.map((resp) => resp.rolle)
            return responsible === 'all'
                ? true
                : rollen.includes(responsible)
        })

        const tasks = filteredTasks
            .map((task: HApiTask) => {
                const dayOffsetFromStartDate = task.days < 0
                    ? task.days - puffer
                    : task.days

                const deadline = task.days !== -1000
                    ? startOfDay(addDays(parsedStartDate, dayOffsetFromStartDate))
                    : new Date(parsedStartDate.getFullYear(), 0, 1)

                return {
                    deadline: deadline,
                    title: task.title,
                    targets: task.targets,
                    responsible: task.responsible,
                    chapters: task.chapters
                } as CalendarTask
            })
            .sort((a: CalendarTask, b: CalendarTask) => a.deadline.getTime() - b.deadline.getTime())

        // Update calendarTasks after the pseudo loading time
        setTimeout(() => {
            setCalendarTasks(tasks)
            setIsUpdatingTasks(false)
        }, 500)
    }, [parsedStartDate, responsible, puffer, taskList]);

    useEffect(() => {
        const getTasks = async () => {
            const tasks = await loadTasks(i18n.language)
            setTaskList(tasks)
            setIsLoadingTasks(false)
        }

        const loadCachedValues = () => {
            const startDate = window.sessionStorage.getItem(startDateCacheKey);
            setStartDate(startDate || initialStartDate)

            const responsible = window.sessionStorage.getItem(responsibleCacheKey);
            setResponsible(responsible || initialResponsible)

            const buffer = window.sessionStorage.getItem(bufferCacheKey);
            setPuffer(parseInt(buffer || '') || 0)

            const calendarPrefix = window.sessionStorage.getItem(calendarDesignationCacheKey);
            setDesignation(calendarPrefix || t('calendarPage.defaultDesignation'))
        }

        loadCachedValues()
        getTasks()
    }, []);

    return (
        <div className='calendar-form'>
            <div className='filter'>
                <form className='filter-inputs'>
                    <div className='form-entry'>
                        <label htmlFor="startDate">
                            {t('calendarPage.startDate')}
                        </label>
                        <input id="startDate" type="date" name="startDate" value={startDate}
                               onChange={onStartDateChanged}/>
                    </div>

                    <div className='form-entry'>
                        <label htmlFor={"responsible"}>
                            {t('calendarPage.responsible')}
                        </label>
                        <select name="responsible" id="responsible" value={responsible}
                                onChange={onResponsibleeChanged}>
                            <option value="all">{t('calendarPage.responsibleOptions.all')}</option>
                            <option value="LL">{t('calendarPage.responsibleOptions.ll')}</option>
                            <option value="AL">{t('calendarPage.responsibleOptions.al')}</option>
                            <option value="C">{t('calendarPage.responsibleOptions.c')}</option>
                        </select>
                    </div>

                    <div className='form-entry'>
                        <div className="label-with-icon">
                            <label htmlFor={"puffer"}>
                                {t('calendarPage.puffer')}
                            </label>
                            <div>
                                <FontAwesomeIcon icon={faCircleInfo} data-tooltip-id="buffer-tooltip"/>
                                <Tooltip id="buffer-tooltip">
                                    <div style={{ maxWidth: '200px' }}>
                                        {t('calendarPage.pufferDescription')}
                                    </div>
                                </Tooltip>
                            </div>
                        </div>

                        <input type="number" id="puffer" name="puffer" value={puffer.toString()}
                               onChange={onBufferChanged}/>
                    </div>

                    <div className='form-entry'>
                        <div className="label-with-icon">
                            <label htmlFor="calendar-designation">
                                {t('calendarPage.designation')}
                            </label>
                            <div>
                                <FontAwesomeIcon icon={faCircleInfo} data-tooltip-id="designation-tooltip"/>
                                <Tooltip id="designation-tooltip">
                                    <div style={{
                                        maxWidth: '200px'
                                    }}>
                                        {t('calendarPage.designationDescription')}
                                    </div>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="input">
                            <input type='text' name='calendar-designation' id="calendar-designation"
                                   value={designation}
                                   onChange={onDesignationChanged}/>
                        </div>
                    </div>
                </form>

                <div>
                    {hasActiveCache() &&
                        <a className='cursor-pointer' onClick={resetValues}>
                            {t('calendarPage.resetValues')}
                        </a>
                    }
                </div>
            </div>

            <div className='download'>
                <Downloads startDate={parsedStartDate} tasks={calendarTasks} designation={designation}/>
            </div>

            <Loading isLoading={isLoadingTasks || !taskList}/>
            {!isLoadingTasks && !!taskList
                && <CalendarTable tasks={calendarTasks} prefix={designation} isUpdating={isUpdatingTasks}/>}
        </div>
    );
}

export default CalendarForm