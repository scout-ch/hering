import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { HApiChapter, HApiRole } from "../../../apis/hering-api";

export type CalendarTask = {
    deadline: Date
    title: string
    targets: HApiRole[]
    responsible: HApiRole[]
    chapters: HApiChapter[]
}

function Task(props: CalendarTask) {

    const { t } = useTranslation()

    const targets = props.targets
        .map((target) => target['rolle'])
        .join(', ')
    const responsible = props.responsible
        .map((responsible) => t(`target.role.${responsible['rolle']}`))
        .join(', ')

    const createChapterLink = (chapter: HApiChapter) => `/${chapter.section.slug}#${chapter.slug}`
    const chapters = props.chapters.length > 1
        ? <ul>{props.chapters.map((chapter: HApiChapter) => {
            return <li key={chapter.slug}>
                <Link to={createChapterLink(chapter)}>{chapter.title}</Link>
            </li>
        })}</ul>
        : props.chapters.map((chapter: HApiChapter) => {
            return <Link key={chapter.slug} to={createChapterLink(chapter)}>{t(`calendarPage.table.link`)}</Link>
        })

    return <tr>
        <td align={"center"}>{format(props.deadline, 'dd.MM.yyyy')}</td>
        <td align={"left"}>{props.title}</td>
        <td>{responsible}</td>
        <td>{targets}</td>
        <td align={"center"}>{chapters}</td>
    </tr>
}

export default Task