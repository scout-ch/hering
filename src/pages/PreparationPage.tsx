// import styled from '@emotion/styled'
import React from 'react'
import { MainContainer, Section } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Back } from '../App'
import Chapter, { ChapterT } from '../components/Chapter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent} from '../markdown/MarkdownComponents';

type Props = {
  section: Section
}

function PreparationPage(props: Props) {

  const section = props.section
  if (!section) return null
  const chapters = section['chapters'].sort(function (a: ChapterT, b: ChapterT) {
    return a.sorting - b.sorting;
  }).map(function (chapter: any) {
    return <Chapter key={chapter['title']} data={chapter}></Chapter>
  })

  return <MainContainer>
    <Back />
    <h1><FontAwesomeIcon icon="scroll" /> {section['title']}</h1>
    
    <ReactMarkdown remarkPlugins={[remarkGfm]}
      components={LinkComponent}>{section.content}</ReactMarkdown>
    {chapters}
  </MainContainer>
}
export default PreparationPage
