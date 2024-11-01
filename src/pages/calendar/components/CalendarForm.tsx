import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import CalendarTable from './CalendarTable';
import { CalendarTask } from './Task';
import { addDays, format, isValid, parse, startOfDay } from "date-fns";
import Downloads from "./Downloads";
import Loading from "../../../components/loading/Loading";
import { loadTasks, HApiTask } from "../../../apis/hering-api";
import i18n from "i18next";

const dateFormat = 'yyyy-MM-dd'
const initialStartDate = format(Date.now(), dateFormat)
const initialResponsible = 'all'

const startDateCacheKey = 'start-date'
const responsibleCacheKey = 'responsible'
const bufferCacheKey = 'buffer'
const calendarPrefixCacheKey = 'calendar-prefix'

function CalendarForm() {

    const { t } = useTranslation()

    const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true)
    const [isUpdatingTasks, setIsUpdatingTasks] = useState<boolean>(true)
    const [startDate, setStartDate] = useState<string>(initialStartDate)
    const [parsedStartDate, setParsedStartDate] = useState<Date>(new Date())
    const [responsible, setResponsible] = useState<string>(initialResponsible)
    const [puffer, setPuffer] = useState<number>(0)
    const [calendarTitlePrefix, setCalendarTitlePrefix] = useState<string>('')
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
        const newBuffer = parseInt(e.currentTarget.value) || 0;
        setPuffer(newBuffer)
        window.sessionStorage.setItem(bufferCacheKey, newBuffer.toString());
    }

    const onCalendarPrefixChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const newPrefix = e.currentTarget.value
        setCalendarTitlePrefix(newPrefix)
        window.sessionStorage.setItem(calendarPrefixCacheKey, newPrefix);
    }

    const resetValues = () => {
        window.sessionStorage.removeItem(startDateCacheKey);
        setStartDate(initialStartDate)

        window.sessionStorage.removeItem(responsibleCacheKey);
        setResponsible(initialResponsible)

        window.sessionStorage.removeItem(bufferCacheKey);
        setPuffer(0)

        window.sessionStorage.removeItem(calendarPrefixCacheKey);
        setCalendarTitlePrefix('')
    }

    const hasActiveCache = () => {
        return !!window.sessionStorage.getItem(startDateCacheKey)
            || !!window.sessionStorage.getItem(responsibleCacheKey)
            || !!window.sessionStorage.getItem(bufferCacheKey)
            || !!window.sessionStorage.getItem(calendarPrefixCacheKey)
    }

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

            const calendarPrefix = window.sessionStorage.getItem(calendarPrefixCacheKey);
            setCalendarTitlePrefix(calendarPrefix || '')
        }

        loadCachedValues()
        getTasks()
    }, []);

    return (
        <div>
            <div className='calendar-form-container'>
                <form>
                    <ul className='calendar-form'>
                        <li>
                            <label htmlFor="startDate">
                                {t('calendarPage.startDate')}
                            </label>
                            <input id="startDate" type="date" name="startDate" value={startDate}
                                   onChange={onStartDateChanged}/>
                        </li>
                        <li>
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
                        </li>
                        <hr/>
                        <li>
                            <label htmlFor={"puffer"}>
                                {t('calendarPage.puffer')}
                            </label>
                            <input type="number" id="puffer" name="puffer" value={puffer.toString()}
                                   onChange={onBufferChanged}/>
                        </li>
                        <li>
                            <label htmlFor={"calendar-prefix"}>
                                {t('calendarPage.prefixPlaceholder')}
                            </label>
                            <div className="input">
                                <input type='text' name='calendar-prefix' id={"calendar-prefix"}
                                       value={calendarTitlePrefix}
                                       onChange={onCalendarPrefixChanged}/>
                                <div className='calendar-title-prefix-hint'>
                                    {t('calendarPage.prefixPreview', { calendarTitlePrefix: calendarTitlePrefix })}
                                </div>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>

            <div className="btn-group">
                {hasActiveCache() &&
                    <button className="btn" style={{ margin: '0 auto 0 0' }}
                            onClick={resetValues}>
                        {t('calendarPage.resetValues')}
                    </button>
                }
                <Downloads startDate={parsedStartDate} tasks={calendarTasks} calendarTitlePrefix={calendarTitlePrefix}/>
            </div>

            <Loading isLoading={isLoadingTasks || !taskList}/>
            {!isLoadingTasks && !!taskList
                && <CalendarTable tasks={calendarTasks} prefix={calendarTitlePrefix} isUpdating={isUpdatingTasks}/>}
        </div>
    );
}

export default CalendarForm