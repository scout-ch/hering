import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../../helper/MarkdownComponents';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { DocumentTitle } from "../../components/page-title";
import { i18n } from "../../i18n";
import { useQuery } from "@tanstack/react-query";
import { loadPage } from "../../apis/hering-api.ts";
import Loading from "../../components/loading/Loading.tsx";
import { lazy, Suspense } from "react";

const Error = lazy(() => import('../../components/error/Error.tsx'));

function ImpressumPage() {

    const lang = i18n.language

    const impressumPage = useQuery({
        queryKey: ['impressum', lang],
        queryFn: async () => await loadPage('impressum', lang)
    })

    if (impressumPage.isPending) {
        return <Loading/>
    }

    if (impressumPage.isError) {
        return <Suspense><Error error={impressumPage.error}/></Suspense>
    }

    return <>
        <DocumentTitle title={impressumPage.data.title}/>
        <div className='content-main'>
            <div className='calendar'>
                <h1>
                    <FontAwesomeIcon icon={faCircleInfo}/> {impressumPage.data.title}
                </h1>
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={LinkComponent}>
                    {impressumPage.data.content}
                </Markdown>
            </div>
        </div>
    </>
}

export default ImpressumPage
