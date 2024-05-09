import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Chapter, { ChapterT } from "./components/Chapter";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LinkComponent } from "../../helper/MarkdownComponents";
import { useLocation } from "react-router-dom";
import { handleIntersectionChanged } from "./helpers/intersection.helper";

export type SectionT = {
    chapters: ChapterT[]
    sorting: number
    title: string
    content: string
    slug: string
    menu_name: string
    localizations: any
}

export type SectionsByKey = {
    [key: string]: SectionT
}

type Props = {
    sections: SectionsByKey
}

type Params = {
    slug: string
}

function SectionPage(props: Props) {
    const { slug } = useParams<Params>()
    const section = props.sections[slug || '']
    const location = useLocation()

    useEffect(() => {
        if (section) {
            document.title = section['title']
        }
    }, [section]);

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

    const chapters = section['chapters']
        .sort((a: ChapterT, b: ChapterT) => a.sorting - b.sorting)
        .map(chapter => <Chapter key={chapter['title']} data={chapter}></Chapter>)

    return <div className="content" id="section">
        <div className="content-main">
            <div id="section-title" className="section-title">
                <h1>{section['title']}</h1>
            </div>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={LinkComponent}>
                {section.content}
            </Markdown>
            {chapters}
        </div>
    </div>
}

export default SectionPage
