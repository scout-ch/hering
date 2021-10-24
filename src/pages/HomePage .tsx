// import styled from '@emotion/styled'
import React from 'react'
import { Helmet } from 'react-helmet'
import { MainContainer } from '../App'

import client from "./../client";
import i18n from './../i18n';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../helper/MarkdownComponents';
import { withTranslation } from 'react-i18next';

type StartPage = {
  title: string
  content: string
}

function HomePage() {
  const lang = i18n.language
  const [startPage, setStartPage] = React.useState<StartPage>({title: '', content: ''});

  React.useEffect(() => {
    client.get('/start-page?_locale=' + lang).then((response: { data: any }) => {
      setStartPage(response.data)
    })
  }, [lang])

  if (!startPage) return null

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