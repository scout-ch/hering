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
    menu_name: string
    content: string
    slug: string
    slug_with_section: string
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
    return <div className='chapter'>
        <div id={data.slug}>

            <div className="chapter-title">
                {data.icon && (<img src={data.icon.url} alt="icon" />)}
                <h2 id={data.slug}>{data.title}</h2>
            </div>
            <div className='content-main'>
                <div className="targets">{targets}</div>
                <ReactMarkdown remarkPlugins={[remarkGfm]}
                    components={LinkComponent}>{data.content}</ReactMarkdown>
            </div>
        </div>
    </div>
}

export default Chapter