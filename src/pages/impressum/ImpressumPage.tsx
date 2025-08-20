import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../../helper/MarkdownComponents';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { HApiImpressumPage } from "../../apis/hering-api";
import { DocumentTitle } from "../../components/page-title";

type Props = {
    page: HApiImpressumPage
}

function ImpressumPage(props: Props) {

    const impressumPage = props.page;

    return <>
        <DocumentTitle title={impressumPage.title}/>
        <div className='content-main'>
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
    </>
}

export default ImpressumPage
