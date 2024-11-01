import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../../helper/MarkdownComponents';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { HApiImpressumPage } from "../../apis/hering-api";

type Props = {
    page: HApiImpressumPage
}

function ImpressumPage(props: Props) {

    const impressumPage = props.page;

    useEffect(() => {
        document.title = impressumPage?.title ?? '';
    }, [impressumPage]);

    return <div className='content-main'>
        <div className='calendar'>
            <h1>
                <FontAwesomeIcon icon={faCircleInfo}/> {impressumPage.title}
            </h1>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={LinkComponent}>
                {impressumPage.content}
            </Markdown>
        </div>
    </div>
}

export default ImpressumPage
