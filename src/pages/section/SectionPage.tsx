import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Chapter from "./components/Chapter";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LinkComponent } from "../../helper/MarkdownComponents";
import { useLocation } from "react-router-dom";
import { handleIntersectionChanged } from "./helpers/intersection.helper";
import { HApiSection } from "../../apis/hering-api";

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

    const location = useLocation()
    const { sectionId } = useParams<Params>()
    const [section, setSection] = useState<HApiSection | undefined>()

    useEffect(() => {
        const sectionHashIndex = sectionId?.indexOf('#')
        const cleanSectionId = sectionHashIndex === -1
            ? sectionId
            : sectionId?.substring(0, sectionHashIndex);
        setSection(props.sections[cleanSectionId || ''])

        if (section) {
            document.title = section.title
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

    const chapters = (section.chapters ?? [])
        .map(chapter => <Chapter key={chapter['title']} data={chapter}></Chapter>)

    return <div className="content" id="section">
        <div className="content-main">
            <div id="section-title" className="section-title">
                <h1>{section['title']}</h1>
            </div>
            <Markdown remarkPlugins={[remarkGfm]}
                      components={LinkComponent}>
            </Markdown>
            {chapters}
        </div>
    </div>
}

export default SectionPage
