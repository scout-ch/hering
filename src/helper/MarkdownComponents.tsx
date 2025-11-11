import { Link } from 'react-router-dom'
import { type Components } from "react-markdown"
import Warning from "../components/warning/Warning"

export const LinkComponent: Components = {
    blockquote({ children }) {
        return <Warning content={children}/>
    },
    table({ children }) {
        return <div className="table-overflow">
            <table>{children}</table>
        </div>
    },
    a({ node, children, ...props }) {
        const link = props.href

        const isMailtoLink = link?.startsWith('mailto:')
        if (isMailtoLink) {
            return <Link to='#'
                         onClick={(e) => {
                             window.location.href = props.href || '';
                             e.preventDefault();
                         }}>
                {children}
            </Link>
        }

        const isPublicLink = link?.startsWith('http')
        if (isPublicLink) {
            return <a href={link} target="_blank" rel="noreferrer">{children}</a>
        }

        const isChapterLink = link?.startsWith('/')
        if (isChapterLink) {
            return <Link to={link || ''}>{children}</Link>
        }

        return <Link to={props.href || ''}>{children}</Link>
    },
    img({ node, children, ...props }) {
        const altProp = props.alt
        /*
        * matches the following (any combination or order):
        * alt="..." width="..." height="..."
        */
        const found = altProp?.matchAll(/\b(?<key>alt|width|height)\s*=\s*"(?<val>(?:\\.|[^"\\])*)"/g);
        let altText: string | undefined = undefined;
        let width: string | undefined = undefined;
        let height: string | undefined = undefined;

        for (const m of found || []) {
            if (!m.groups) {
                continue;
            }

            if (m.groups['key'] === 'alt') {
                altText = m.groups['val'];
            } else if (m.groups['key'] === 'width') {
                width = m.groups['val'];
            } else if (m.groups['key'] === 'height') {
                height = m.groups['val'];
            }
        }

        if (!altText && !width && !height) {
            altText = altProp;
        }

        return <img src={props.src} alt={altText || ''} width={width} height={height}/>
    }
}