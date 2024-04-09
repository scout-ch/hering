import React from 'react'
import {useTranslation} from 'react-i18next';
import {ChapterT, Role} from '../../section/components/Chapter';
import {Link} from "react-router-dom";
import {format} from "date-fns";

export type TaskT = {
    deadline: Date
    title: string
    targets: Role[]
    responsible: Role[]
    chapters: ChapterT[]
}

function Task(props: TaskT) {

    const {t} = useTranslation()

    const targets = props.targets
        .map((target) => target['rolle'])
        .join(', ')
    const responsible = props.responsible
        .map((responsible) => t(`target.role.${responsible['rolle']}`))
        .join(', ')

    const chapters = props.chapters.length > 1 ? <ul>{props.chapters.map((chapter: ChapterT) => {
        return <li key={chapter.slug}>
            <Link to={'/' + chapter.section.slug + '#' + chapter.slug}>{chapter.title}</Link>
        </li>
    })}</ul> : props.chapters.map((chapter: ChapterT) => {
        return <Link to={'/' + chapter.section.slug + '#' + chapter.slug}>{t(`calendarPage.table.link`)}</Link>
    })

    return <tr>
        <td align={"center"}>{format(props.deadline, 'dd.MM.yyyy')}</td>
        <th align={"left"}>{props.title}</th>
        <td>{responsible}</td>
        <td>{targets}</td>
        <td align={"center"}>{chapters}</td>
    </tr>
}

export default Task