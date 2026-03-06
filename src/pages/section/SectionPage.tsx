import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from '@tanstack/react-router'
import Chapter from "./components/Chapter";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LinkComponent } from "../../helper/MarkdownComponents";
import { handleIntersectionChanged } from "./helpers/intersection.helper";
import { type HApiSection, loadSections } from "../../apis/hering-api";
import { useDocumentTitle } from "../../components/page-title";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

type SectionsById = {
    [key: string]: HApiSection
}

function SectionPage() {

    const { i18n } = useTranslation()
    const lang = i18n.language
    const { setPageTitle } = useDocumentTitle();
    const location = useLocation()
    const { sectionId } = useParams({ strict: false })
    const navigate = useNavigate()

    const sections = useQuery({
        queryKey: ['sections', lang],
        queryFn: async () => await loadSections(lang)
    })

    const sectionsById = useMemo(() => {
        return (sections.data || []).reduce((map: SectionsById, section: HApiSection) => {
            map[section.documentId] = section
            return map
        }, {})
    }, [sections.data])

    const section = useMemo(() => {
        const sectionHashIndex = sectionId?.indexOf('#')
        const cleanSectionId = sectionHashIndex === -1
            ? sectionId
            : sectionId?.substring(0, sectionHashIndex);
        return sectionsById[cleanSectionId || '']
    }, [sectionId, sectionsById])

    useEffect(() => {
        if (!sections.isLoading && sections.data && !section) {
            navigate({ to: '/' })
        }
    }, [sections.isLoading, sections.data, section, navigate])

    useEffect(() => {
        return () => {
            setPageTitle(undefined)
        }
    }, [section])

    useEffect(() => {
        const observer = new IntersectionObserver(entries => handleIntersectionChanged(entries, location.hash), {
            root: document,
            rootMargin: '0px',
            threshold: [0.2]
        });

        document.querySelectorAll('.chapter').forEach((chapter) => {
            observer.observe(chapter);
        });

        return () => {
            observer.disconnect()
        };
    }, [section, location]);

    if (!section) {
        return null
    }

    return <div className="content" id="section">
        <div className="content-main">
            <div id="section-title" className="section-title">
                <h1>{section.title}</h1>
            </div>
            <Markdown remarkPlugins={[remarkGfm]}
                      components={LinkComponent}>
            </Markdown>
            {(section.chapters ?? []).map(chapter => <Chapter key={chapter.title} data={chapter}></Chapter>)}
        </div>
    </div>
}

export default SectionPage
