import React from 'react'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../helper/MarkdownComponents';
import CalendarForm from '../components/CalendarForm';
import { withTranslation } from 'react-i18next'
import { IconT } from '../components/Section';

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

  return <div className='content-main'>
    <Helmet>
      <title>{calendarPage.title}</title>
    </Helmet>
    <div className='calendar'>
      <h1><FontAwesomeIcon icon="calendar" /> {calendarPage.title}</h1>
      <ReactMarkdown
        plugins={[remarkGfm]}
        components={LinkComponent}
      >{calendarPage.content}</ReactMarkdown>

      <CalendarForm />
    </div>
  </div>
}
export default withTranslation()(CalendarPage)
