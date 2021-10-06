// import styled from '@emotion/styled'
import React from 'react'
import { Helmet } from 'react-helmet'
import { MainContainer } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Back } from '../App'
import { withRouter } from 'react-router';
import CalendarForm from '../components/CalendarForm';
import { useTranslation } from 'react-i18next'

function CalendarPage() {
  const { t } = useTranslation()

  return <MainContainer>
    <Helmet>
      <title>{t('calendarPage.title')}</title>
    </Helmet>
    <Back />
    <h1><FontAwesomeIcon icon="calendar" /> {t('calendarPage.title')}</h1>

    <CalendarForm />

  </MainContainer>
}
export default withRouter(CalendarPage)
