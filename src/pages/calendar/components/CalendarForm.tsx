import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import CalendarTable from './CalendarTable';
import { ChapterT } from '../../section/components/Chapter';
import { TaskT } from './Task';
import client from '../../../client';
import { addDays, format, isValid, parse, startOfDay } from "date-fns";
import IcsDownload from "./IcsDownload";
import CsvDownload from "./CsvDownload";

type Roles = {
    rolle: string
}

type Task = {
    id: number
    title: string
    days: number
    responsible: Roles[]
    targets: Roles[]
    chapters: ChapterT[]
}

const dateFormat = 'yyyy-MM-dd'
const initialStartDate = format(Date.now(), dateFormat)
const initialResponsible = 'all'

const startDateCacheKey = 'start-date'
const responsibleCacheKey = 'responsible'
const bufferCacheKey = 'buffer'
const calendarPrefixCacheKey = 'calendar-prefix'

function CalendarForm() {

    const { t } = useTranslation()

    const [startDate, setStartDate] = useState<string>(initialStartDate)
    const [responsible, setResponsible] = useState<string>(initialResponsible)
    const [puffer, setPuffer] = useState<number>(0)
    const [calendarTitlePrefix, setCalendarTitlePrefix] = useState<string>('')
    const [taskList, setTaskList] = useState<Task[]>([])
    const [tasks, setTasks] = useState<TaskT[]>([])

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

    const createTasks = useCallback((event?: FormEvent<HTMLFormElement> | undefined) => {
        event?.preventDefault()

        const parsedStartDate = parse(startDate, dateFormat, Date.now())
        const isValidDate = isValid(parsedStartDate)
        if (!isValidDate) {
            return
        }

        const filteredTasks = taskList.filter((task: Task) => {
            const rollen = task.responsible.map((resp) => resp.rolle)
            return responsible === 'all'
                ? true
                : rollen.includes(responsible)
        })

        const tasks = filteredTasks
            .map((task: Task) => {
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
                } as TaskT
            })
            .sort((a: TaskT, b: TaskT) => a.deadline.getTime() - b.deadline.getTime())

        setTasks(tasks)
    }, [startDate, responsible, puffer, taskList]);

    useEffect(() => {
        createTasks()
    }, [createTasks]);

    useEffect(() => {
        const getTasks = async () => {
            const response = await client.get('/tasks?_locale=' + i18n.language)
            setTaskList(response.data)
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

            <div className="download-btn-group">
                {hasActiveCache() &&
                    <button className="download-btn" style={{ margin: '0 auto 0 0' }}
                            onClick={resetValues}>
                        {t('calendarPage.resetValues')}
                    </button>
                }
                <IcsDownload tasks={tasks} calendarTitlePrefix={calendarTitlePrefix}></IcsDownload>
                <CsvDownload tasks={tasks} calendarTitlePrefix={calendarTitlePrefix}></CsvDownload>
            </div>

            <CalendarTable tasks={tasks} prefix={calendarTitlePrefix}/>
        </div>
    );
}

export default CalendarForm