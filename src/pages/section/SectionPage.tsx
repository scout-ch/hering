import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Chapter from "./components/Chapter";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LinkComponent } from "../../helper/MarkdownComponents";
import { useLocation } from "react-router-dom";
import { handleIntersectionChanged } from "./helpers/intersection.helper";
import { type HApiSection } from "../../apis/hering-api";
import { useDocumentTitle } from "../../components/page-title";

export type SectionsById = {
    [key: string]: HApiSection
}

type Props = {
    sections: SectionsById
}

type Params = {
    sectionId: string
}

function SectionPage(props: Props) {

    const { setPageTitle } = useDocumentTitle();

    const location = useLocation()
    const { sectionId } = useParams<Params>()
    const [section, setSection] = useState<HApiSection | undefined>()

    useEffect(() => {
        const sectionHashIndex = sectionId?.indexOf('#')
        const cleanSectionId = sectionHashIndex === -1
            ? sectionId
            : sectionId?.substring(0, sectionHashIndex);
        setSection(props.sections[cleanSectionId || ''])

        return () => {
            setPageTitle(undefined) // Remove page title when the section is reset
        }
    }, [sectionId]);

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
