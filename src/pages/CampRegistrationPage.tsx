// import styled from '@emotion/styled'
import React from 'react'
import { MainContainer } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Back } from '../App'
import { withRouter } from 'react-router';
import Chapter from '../components/Chapter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent} from '../markdown/MarkdownComponents';


function CampRegistrationPage(props: any) {

  const section = props.section
  if (!section) return null
  const chapters = section['chapters'].map(function (chapter: any) {
    return <Chapter key={chapter['title']} data={chapter}></Chapter>
  })

  return <MainContainer>
    <Back />
    <h1><FontAwesomeIcon icon="lock" /> {section['title']}</h1>
    <ReactMarkdown 
      plugins={[remarkGfm]}
      components={LinkComponent}
    >{section.content}</ReactMarkdown>
    {chapters}
  </MainContainer>
}
export default withRouter(CampRegistrationPage)
