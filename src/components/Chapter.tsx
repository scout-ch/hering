import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent } from '../helper/MarkdownComponents'
import { IconT, SectionT } from './Section'

export type Role = {
    rolle: string
}

export type ChapterT = {
    sorting: number
    title: string
    content: string
    slug: string
    icon: IconT
    section: SectionT
    responsible: Array<Role>
}

type ChapterProps = {
    data: ChapterT;
  };

function Chapter(props: ChapterProps) {
    const data = props.data
    if (!data) {
        return null
    }

    const targets = data.responsible.map((target) => target['rolle'].toUpperCase()).join(', ')
    return <div id={data.slug}>

        <div className="chapter--title">
            <h2 id={data.slug}>{data.title}</h2>
            <img src={data.icon ? data.icon.url : ''} alt="icon"/>
        </div>
        <div className="targets">{targets}</div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}
            components={LinkComponent}>{data.content}</ReactMarkdown>
    </div>
}

export default Chapter