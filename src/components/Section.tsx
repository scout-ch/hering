import React, {useEffect} from 'react'
import {withTranslation} from 'react-i18next'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {LinkComponent} from '../helper/MarkdownComponents'
import Chapter, {ChapterT} from './Chapter'

export type SectionT = {
    chapters: Array<ChapterT>
    sorting: number
    title: string
    content: string
    slug: string
    menu_name: string
    localizations: any
}

export type IconT = {
    url: string
    mime: string
}

type Props = {
    section: SectionT
}

function Section(props: Props) {

    const chapters = props.section['chapters']
        .sort((a: ChapterT, b: ChapterT) => a.sorting - b.sorting)
        .map(chapter => <Chapter key={chapter['title']} data={chapter}></Chapter>)

    useEffect(() => {
        document.title = props.section['title']
    }, [props]);

    return <div className='content'>
        <div className='content-main'>
            <div id="section-title" className="section-title">
                <h1>{props.section['title']}</h1>
            </div>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={LinkComponent}>
                {props.section.content}
            </Markdown>
            {chapters}
        </div>
    </div>
}

export default withTranslation()(Section)