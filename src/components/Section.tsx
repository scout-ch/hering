import React from 'react'
import { MainContainer } from '../App'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent } from '../markdown/MarkdownComponents'
import Chapter, { ChapterT } from './Chapter'

export type SectionT = {
    chapters: Array<ChapterT>
    sorting: number
    title: string
    content: string
  }

type Props = {
    section: SectionT
    icon: JSX.Element
}

function Section(props: Props) {
    const chapters = props.section['chapters'].sort(function (a: ChapterT, b: ChapterT) {
        return a.sorting - b.sorting;
    }).map(function (chapter: any) {
        return <Chapter key={chapter['title']} data={chapter}></Chapter>
    })

    return <MainContainer>
        <h1>{props.icon} {props.section['title']}</h1>
        <ReactMarkdown
            plugins={[remarkGfm]}
            components={LinkComponent}
        >{props.section.content}</ReactMarkdown>
        {chapters}
    </MainContainer>
}

export default Section