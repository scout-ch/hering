import React from 'react'
import {useTranslation} from 'react-i18next';
import {ChapterT, Role} from './Chapter';
import {Link} from "react-router-dom";

export type TaskT = {
    deadline: Date
    title: string
    targets: Role[]
    responsible: Role[]
    chapters: ChapterT[]
}

function Task(props: TaskT) {

    const {t} = useTranslation()

    const options = {year: 'numeric', month: 'numeric', day: 'numeric'} as Intl.DateTimeFormatOptions
    const deadline = props.deadline.toLocaleDateString('de-DE', options)
    const targets = props.targets
        .map((target) => target['rolle'])
        .join(', ')
    const responsible = props.responsible
        .map((responsible) => t(`target.role.${responsible['rolle']}`))
        .join(', ')

    const chapters = props.chapters.map((chapter: ChapterT) => {
        return <li key={chapter.slug}>
            <Link to={'/' + chapter.section.slug + '#' + chapter.slug}>{chapter.title}</Link>
        </li>
    })

    return <tr>
        <td>{deadline}</td>
        <td>{props.title}</td>
        <td>{responsible}</td>
        <td>{targets}</td>
        <td>
            <ul>{chapters}</ul>
        </td>
    </tr>
}

export default Task