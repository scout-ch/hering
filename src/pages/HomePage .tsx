// import styled from '@emotion/styled'
import React from 'react'
import { Helmet } from 'react-helmet'
import { MainContainer } from '../App'

import { withRouter } from 'react-router';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation()

  return <MainContainer>
    <Helmet>
      <title>{t('homePage.title')}</title>
    </Helmet>
    
    <header className="App-header">
      <h1>{t('homePage.title')}</h1>
    </header>

  </MainContainer>
}
export default withRouter(HomePage)