import React, {FormEvent, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next';
import i18n from '../i18n';
import CalendarTable from './CalendarTable';
import {ChapterT} from './Chapter';
import {TaskT} from './Task';
import client from '../client';
import {addDays, format, parse} from "date-fns";

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

function CalendarForm() {

    const {t} = useTranslation()

    const [startDate, setStartDate] = useState<string>(format(Date.now(), dateFormat))
    const [responsible, setResponsible] = useState<string>('all')
    const [puffer, setPuffer] = useState<number>(0)
    const [calendarTitlePrefix, setCalendarTitlePrefix] = useState<string>('')
    const [taskList, setTaskList] = useState<Task[]>([])
    const [tasks, setTasks] = useState<TaskT[]>([])

    useEffect(() => {
        const getTasks = async () => {
            const response = await client.get('/tasks?_locale=' + i18n.language)
            setTaskList(response.data)
        }

        getTasks()
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement> | undefined) => {
        event?.preventDefault()

        const parsedStartDate = parse(startDate, dateFormat, Date.now())
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
                    ? addDays(parsedStartDate, dayOffsetFromStartDate)
                    : new Date(parsedStartDate.getFullYear(), 0, 1)

                console.log(`${task.title}: ${dayOffsetFromStartDate} -> ${format(deadline, 'dd.MM.yyyy')}`)

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
    }

    return (
        <div>
            <div className='calendar-form-container'>
                <form onSubmit={handleSubmit}>
                    <ul className='calendar-form'>
                        <li>
                            <label>
                                {t('calendarPage.startDate')}
                            </label>
                            <input type="date" name="startDate" value={startDate}
                                   onChange={e => setStartDate(e.currentTarget.value)}/>
                        </li>
                        <li>
                            <label>
                                {t('calendarPage.responsible')}
                            </label>
                            <select name="responsible" id="responsible" value={responsible}
                                    onChange={e => setResponsible(e.currentTarget.value)}>
                                <option value="all">{t('calendarPage.responsibleOptions.all')}</option>
                                <option value="LL">{t('calendarPage.responsibleOptions.ll')}</option>
                                <option value="AL">{t('calendarPage.responsibleOptions.al')}</option>
                                <option value="C">{t('calendarPage.responsibleOptions.c')}</option>
                            </select>
                        </li>
                        <hr/>
                        <li>
                            <label>
                                {t('calendarPage.puffer')}
                            </label>
                            <input type="number" id="puffer" name="puffer" value={puffer}
                                   onChange={e => setPuffer(parseInt(e.currentTarget.value) || 0)}/>
                        </li>
                        <li>
                            <label>
                                {t('calendarPage.prefixPlaceholder')}
                            </label>
                            <div>
                                <input type='text' name='calendar-prefix' value={calendarTitlePrefix}
                                       onChange={e => setCalendarTitlePrefix(e.currentTarget.value)}/>
                                <div className='calendar-title-prefix-hint'>
                                    {t('calendarPage.prefixPreview', {calendarTitlePrefix: calendarTitlePrefix})}
                                </div>
                            </div>
                        </li>
                        <li>
                            <button type="submit"> {t('calendarPage.ics.generate')}</button>
                        </li>
                    </ul>
                </form>
            </div>

            <CalendarTable tasks={tasks} prefix={calendarTitlePrefix}/>
        </div>
    );
}

export default CalendarForm