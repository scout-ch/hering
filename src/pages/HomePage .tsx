// import styled from '@emotion/styled'
import React from 'react'
import { Helmet } from 'react-helmet'
import { MainContainer } from '../App'

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../helper/MarkdownComponents';
import { withTranslation } from 'react-i18next';
import { IconT } from '../components/Section';

export type StartPage = {
  title: string
  menu_name: string
  icon: IconT
  content: string
}
type Props = {
  page: StartPage
}

function HomePage(props: Props) {
  const startPage = props.page

  return <MainContainer>
    <Helmet>
      <title>{startPage.title}</title>
    </Helmet>
    
    <header className="App-header">
      <h1>{startPage.title}</h1>
    </header>

    <ReactMarkdown
            plugins={[remarkGfm]}
            components={LinkComponent}
        >{startPage.content}</ReactMarkdown>

  </MainContainer>
}
export default withTranslation()(HomePage)