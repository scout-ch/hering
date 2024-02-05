import React from 'react'
import IcsDownload from './IcsDownload';
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
            <IcsDownload tasks={tasks} calendarTitlePrefix={props.prefix}></IcsDownload>
            <table>
                <thead>
                <tr>
                    <td id="when">{t('calendarPage.table.when')}</td>
                    <td id="what">{t('calendarPage.table.what')}</td>
                    <td id="who">{t('calendarPage.table.who')}</td>
                    <td id="target">{t('calendarPage.table.target')}</td>
                    <td id="chapters">{t('calendarPage.table.chapters')}</td>
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