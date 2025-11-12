import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent } from "../../helper/MarkdownComponents"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFishFins } from "@fortawesome/free-solid-svg-icons";
import { loadPage } from "../../apis/hering-api";
import { i18n } from "../../i18n";
import Loading from "../../components/loading/Loading.tsx";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";

const Error = lazy(() => import('../../components/error/Error.tsx'));

function HomePage() {

    const lang = i18n.language

    const homePage = useQuery({
        queryKey: ['homepage', lang],
        queryFn: async () => await loadPage('hering', lang)
    })

    if (homePage.isPending) {
        return <Loading/>
    }

    if (homePage.isError) {
        return <Suspense><Error error={homePage.error}/></Suspense>
    }

    return <div className='content-main'>
        <h1>
            <FontAwesomeIcon icon={faFishFins}/> {homePage.data.title}
        </h1>
        <Markdown
            remarkPlugins={[remarkGfm]}
            components={LinkComponent}>
            {homePage.data.content}
        </Markdown>
    </div>
}

export default HomePage