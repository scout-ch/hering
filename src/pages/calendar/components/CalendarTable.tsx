import React from 'react'
import Task, {TaskT} from './Task';
import {useTranslation} from "react-i18next";

type Props = {
    tasks: TaskT[]
    prefix: string
}

function CalendarTable(props: Props) {

    const tasks = props.tasks;
    const {t} = useTranslation()

    const taskList = tasks.map(function (task) {
        return <Task deadline={task.deadline} key={task.title} title={task.title}
                     targets={task.targets} responsible={task.responsible} chapters={task.chapters}></Task>
    })
    
    return (
        <div className='calendar-table'>
            <table>
                <thead>
                <tr>
                    <th id="when">{t('calendarPage.table.when')}</th>
                    <th id="what">{t('calendarPage.table.what')}</th>
                    <th id="who">{t('calendarPage.table.who')}</th>
                    <th id="target">{t('calendarPage.table.target')}</th>
                    <th id="chapters">{t('calendarPage.table.chapters')}</th>
                </tr>
                </thead>
                <tbody>
                {taskList}
                </tbody>
            </table>
        </div>
    );
}

export default CalendarTable