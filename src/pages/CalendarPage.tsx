import React, {useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {LinkComponent} from '../helper/MarkdownComponents';
import CalendarForm from '../components/CalendarForm';
import {withTranslation} from 'react-i18next'
import {IconT} from '../components/Section';

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
            <h1><FontAwesomeIcon icon="calendar"/> {calendarPage.title}</h1>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={LinkComponent}>
                {calendarPage.content}
            </Markdown>
            <CalendarForm/>
        </div>
    </div>
}

export default withTranslation()(CalendarPage)
