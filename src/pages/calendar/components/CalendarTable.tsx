import React from 'react'
import { useTranslation } from "react-i18next";
import './calendar-table.less';
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { CalendarTask } from "./CalendarForm";

type Props = {
    tasks: CalendarTask[]
    prefix: string
    isUpdating: boolean;
}

function CalendarTable(props: Props) {

    const { t } = useTranslation()

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
                {props.tasks.map(task => {
                    const targets = task.targets
                        .map((target) => target.name)
                        .join(', ')
                    const responsible = task.responsible
                        .map((responsible) => responsible.name)
                        .join(', ')

                    return <tr key={task.id}>
                        <td align={"center"}>{format(task.deadline, 'dd.MM.yyyy')}</td>
                        <td align={"left"}>{task.title}</td>
                        <td>{responsible}</td>
                        <td>{targets}</td>
                        <td align={"center"}>
                            {!!task.chapter &&
                                <Link key={task.chapter.documentId}
                                      to={`/${task.chapter.section.documentId}#${task.chapter.documentId}`}>
                                    {t(`calendarPage.table.link`)}
                                </Link>
                            }
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default CalendarTable