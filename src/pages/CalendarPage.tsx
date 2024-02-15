import React, {useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {LinkComponent} from '../helper/MarkdownComponents';
import CalendarForm from '../components/CalendarForm';
import {IconT} from '../components/Section';
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons";

export type CalendarPageT = {
    title: string
    menu_name: string
    icon: IconT
    content: string
}

type Props = {
    page: CalendarPageT
}

function CalendarPage(props: Props) {

    const calendarPage = props.page

    useEffect(() => {
        document.title = calendarPage.title
    }, [calendarPage]);

    return <div className='content-main'>
        <div className='calendar'>
            <h1>
                <FontAwesomeIcon icon={faCalendarDays}/> {calendarPage.title}
            </h1>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={LinkComponent}>
                {calendarPage.content}
            </Markdown>
            <CalendarForm/>
        </div>
    </div>
}

export default CalendarPage
