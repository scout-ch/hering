import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent } from '../../../helper/MarkdownComponents'
import Target from './Target'
import './chapter.less'
import { HApiChapter } from "../../../apis/hering-api";

type ChapterProps = {
    data: HApiChapter;
};

function Chapter(props: ChapterProps) {
    const data = props.data

    if (!data) {
        return null
    }

    return <div className='chapter'>
        <div id={data.documentId}>
            <div className="chapter-title">
                {data.icon && (<img className='chapter-icon' src={data.icon.url} alt="icon"/>)}
                <h2>{data.title}</h2>
            </div>

            <div className='chapter-main'>
                <Target targets={data.responsible}/>
                <Markdown remarkPlugins={[remarkGfm]}
                          components={LinkComponent}>
                    {data.content}
                </Markdown>
            </div>
        </div>
    </div>
}

export default Chapter