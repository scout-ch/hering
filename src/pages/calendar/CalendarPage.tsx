import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent } from '../../helper/MarkdownComponents'
import CalendarForm from './components/CalendarForm'
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { HApiCalendarPage } from "../../apis/hering-api";
import { DocumentTitle } from "../../components/page-title";

type Props = {
    page: HApiCalendarPage
}

function CalendarPage(props: Props) {

    const calendarPage = props.page

    return <>
        <DocumentTitle title={calendarPage.title}/>
        <div className='content-main'>
            <div>
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
    </>
}

export default CalendarPage
