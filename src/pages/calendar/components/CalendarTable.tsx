import React from 'react'
import Task, { CalendarTask } from './Task';
import { useTranslation } from "react-i18next";
import './calendar-table.less';

type Props = {
    tasks: CalendarTask[]
    prefix: string
    isUpdating: boolean;
}

function CalendarTable(props: Props) {

    const tasks = props.tasks;
    const { t } = useTranslation()

    const taskList = tasks.map(function (task) {
        return <Task deadline={task.deadline} key={task.title} title={task.title}
                     targets={task.targets} responsible={task.responsible} chapters={task.chapters}></Task>
    })

    return (
        <div className={`calendar-table table-overflow ${props.isUpdating ? 'is-updating' : ''}`}>
            <table>
                <thead>
                <tr>
                    <th id="when">{t('calendarPage.table.when')}</th>
                    <th id="what" align={"left"}>{t('calendarPage.table.what')}</th>
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