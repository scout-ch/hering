import React from 'react'
import { MainContainer } from '../App'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent } from '../helper/MarkdownComponents'
import Chapter, { ChapterT } from './Chapter'
import { LinkT } from '../pages/SectionPage'

export type SectionT = {
    chapters: Array<ChapterT>
    sorting: number
    title: string
    content: string
    slug: string
    icon: IconT
    menu_name: string
  }

export type IconT = {
    url: string
    mime: string
}

type Props = {
    section: SectionT
    links: LinkT[]
}

function Section(props: Props) {
    const chapters = props.section['chapters'].sort(function (a: ChapterT, b: ChapterT) {
        return a.sorting - b.sorting;
    }).map(function (chapter: any) {
        return <Chapter key={chapter['title']} data={chapter}></Chapter>
    })

    return <MainContainer>
        <div className="section--title">
            <h1>{props.section['title']}</h1>
            <img src={props.section.icon ? props.section.icon.url : ''} alt="icon" />
        </div>
        <ReactMarkdown
            plugins={[remarkGfm]}
            components={LinkComponent}
        >{props.section.content}</ReactMarkdown>
        {chapters}
    </MainContainer>
}

export default Section