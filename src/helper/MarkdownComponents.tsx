import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {LinksContext} from '../App';
import {Components} from "react-markdown/lib";
import Warning from "../components/Warning";

// // @ts-ignore
// remark.macros.img = function (altText, width) {
//     var url = this;
//     return '<img alt="' + altText + '" src="' + url + '" style="width: ' + width + '" />';
//   };

export const LinkComponent: Components = {
    blockquote({children}) {
        return <Warning content={children}/>
    },
    a({node, children, ...props}) {
        /* eslint-disable */
        const links = useContext(LinksContext)
        const link = props.href

        const linkMatch = link?.match('\\$(.*)\\$');
        if (linkMatch) {
            const foundLink = links.find((l) => {
                return l['key'] == linkMatch[1]
            })

            if (!foundLink) {
                return <Link to={props.href || ''}>{children}</Link>
            }

            if (foundLink['link']) {
                return <a href={foundLink['link']} target="_blank" rel="noreferrer">{children}</a>
            }

            if (foundLink['slug']) {
                return <Link to={'/' + foundLink['slug']}>{children}</Link>
            }

            return <Link to={props.href || ''}>{children}</Link>

        }

        const mailto = link?.match('(mailto:)')
        if (mailto && mailto.length > 2 && mailto[1]) {
            return <Link to='#'
                         onClick={(e) => {
                             window.location.href = props.href || '';
                             e.preventDefault();
                         }}>
                {children}
            </Link>
        }
        return <Link to={props.href || ''}>{children}</Link>
    },
    img({node, children, ...props}) {
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