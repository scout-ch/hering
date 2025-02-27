import { Link } from 'react-router-dom'
import { Components } from "react-markdown/lib"
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
        const alt = props.alt
        /*
        * matches the following:
        * alt: text, size: 50x50
        * or
        * alt: text, width: 50
        * maybe later: alt.match('alt:\\s([\\w\\s\-\_\*]*),?\\s?(size:\\s((\\d*)x(\\d*)))?,?\\s?(width:\\s(\\d*))?,?\\s?(float: (\\w*))?');
        */
        const found = alt?.match('alt: (.*), (size: ((\\d*)x(\\d*)))?(width: (\\d*))?');
        if (found) {
            if (found[7]) {
                return <img src={props.src} alt={found[1]} width={found[7]}/>
            } else {
                return <img src={props.src} alt={found[1]} width={found[4]} height={found[5]}/>
            }
        } else {
            return <img src={props.src} alt={props.alt}/>
        }
    }
}