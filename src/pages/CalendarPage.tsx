import React from 'react'
import { Helmet } from 'react-helmet'
import { MainContainer } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import client from "./../client";
import i18n from './../i18n';
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

  return <MainContainer>
    <Helmet>
      <title>{calendarPage.title}</title>
    </Helmet>
    <h1><FontAwesomeIcon icon="calendar" /> {calendarPage.title}</h1>
    <ReactMarkdown
            plugins={[remarkGfm]}
            components={LinkComponent}
        >{calendarPage.content}</ReactMarkdown>

    <CalendarForm />

  </MainContainer>
}
export default withTranslation()(CalendarPage)
