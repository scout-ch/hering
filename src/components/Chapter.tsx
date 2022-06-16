import React from 'react'
import { withTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent } from '../helper/MarkdownComponents'
import { IconT } from './Section'
import Target from './Target'

export type Role = {
    rolle: string
}

export type ChapterT = {
    id: number
    sorting: number
    title: string
    menu_name: string
    content: string
    slug: string
    slug_with_section: string
    icon: IconT
    section: number
    responsible: Array<Role>
}

type ChapterProps = {
    t: any
    data: ChapterT;
};

function Chapter(props: ChapterProps) {
    const data = props.data
    if (!data) {
        return null
    }

    return <div className='chapter'>
        <div id={data.slug}>

            <div className="chapter-title">
                {data.icon && (<img className='chapter-icon' src={data.icon.url} alt="icon" />)}
                <h2 id={data.slug}>{data.title}</h2>
            </div>
            <div className='chapter-main'>
                <Target targets={data.responsible} />
                <ReactMarkdown remarkPlugins={[remarkGfm]}
                    components={LinkComponent}>{data.content}</ReactMarkdown>
            </div>
        </div>
    </div>
}

export default withTranslation()(Chapter)