import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent } from '../../helper/MarkdownComponents'
import CalendarForm from './components/CalendarForm'
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { loadPage } from "../../apis/hering-api";
import { DocumentTitle } from "../../components/page-title";
import { i18n } from "../../i18n";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading/Loading.tsx";
import { lazy, Suspense } from "react";

const Error = lazy(() => import('../../components/error/Error.tsx'));

function CalendarPage() {

    const lang = i18n.language

    const calendarPage = useQuery({
        queryKey: ['calendar', lang],
        queryFn: async () => await loadPage('calendar', lang)
    })

    if (calendarPage.isPending) {
        return <Loading/>
    }

    if (calendarPage.isError) {
        return <Suspense><Error error={calendarPage.error}/></Suspense>
    }

    return <>
        <DocumentTitle title={calendarPage.data.title}/>
        <div className='content-main'>
            <div>
                <h1>
                    <FontAwesomeIcon icon={faCalendarDays}/> {calendarPage.data.title}
                </h1>
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={LinkComponent}>
                    {calendarPage.data.content}
                </Markdown>
                <CalendarForm/>
            </div>
        </div>
    </>
}

export default CalendarPage
