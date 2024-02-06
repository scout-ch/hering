import React, {useEffect} from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {IconT} from '../components/Section'
import {LinkComponent} from "../helper/MarkdownComponents"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export type StartPageT = {
    title: string
    menu_name: string
    icon: IconT
    content: string
}
type Props = {
    page: StartPageT
}

function HomePage(props: Props) {

    const startPage = props.page

    useEffect(() => {
        document.title = startPage.title
    }, [startPage])

    return <div className='content-main'>

        <h1>
            <FontAwesomeIcon icon="home"/> {startPage.title}
        </h1>

        <Markdown
            remarkPlugins={[remarkGfm]}
            components={LinkComponent}>
            {startPage.content}
        </Markdown>
    </div>
}

export default HomePage