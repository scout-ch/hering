import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent } from '../markdown/MarkdownComponents'

export type Role = {
    rolle: string
}

type ChapterT = {
    key: string
    title: string
    content: string
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

    return <div id={data.key}>
        <h2>{data.title}</h2>
        <div className="targets">{targets}</div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}
            components={LinkComponent}>{data.content}</ReactMarkdown>
    </div>
}

export default Chapter