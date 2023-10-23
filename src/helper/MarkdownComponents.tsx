import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { LinksContext } from '../App';
// import { HashLink } from 'react-router-hash-link';
import Warning from '../components/Warning';

// // @ts-ignore
// remark.macros.img = function (altText, width) {
//     var url = this;
//     return '<img alt="' + altText + '" src="' + url + '" style="width: ' + width + '" />';
//   };

export const LinkComponent = {
    // @ts-ignore
    blockquote({node, children, ...props}) {
        return <Warning content={children}/>
    },
    // @ts-ignore
    a({node, children, ...props}) {
        /* eslint-disable */
        const links = useContext(LinksContext)
        const link = props.href
        var found = link.match('\\$(.*)\\$');
        if (found) {
            //@ts-ignore
            const foundLink = links.find((l) => {return l['key'] == found[1]})
            if (foundLink) {
                if (foundLink['link']) {
                    return <a href={foundLink['link']} target="_blank" rel="noreferrer">{children}</a>
                } else if(foundLink['slug']) {
                    return <HashLink to={`/${foundLink['slug']}`}>{children}</HashLink>
                } else {
                    return <Link to={props.href || ''}>{children}</Link>
                }
            } else {
               return <Link to={props.href || ''}>{children}</Link>
            }
        } else {
            var mailto = link.match('(mailto:)')
            if (mailto[1]) {    
                return <Link to='#' onClick={(e) => { 
                    window.location = props.href;
                    e.preventDefault();
                }}>{children}</Link>
            }
            return <Link to={props.href || ''}>{children}</Link>
        }
        /* eslint-enable */
    },
    // @ts-ignore
    img({node, children, ...props}) {
        const alt = props.alt
        /*
        * matches the following:
        * alt: text, size: 50x50
        * or
        * alt: text, width: 50
        * maybe later: alt.match('alt:\\s([\\w\\s\-\_\*]*),?\\s?(size:\\s((\\d*)x(\\d*)))?,?\\s?(width:\\s(\\d*))?,?\\s?(float: (\\w*))?');
        */
        var found = alt.match('alt: (.*), (size: ((\\d*)x(\\d*)))?(width: (\\d*))?');
        if (found) {
            if (found[7]) {
                return <img src={props.src} alt={found[1]} width={found[7]} />
            } else {
                return <img src={props.src} alt={found[1]} width={found[4]} height={found[5]} />
            }
        } else {
            return <img src={props.src} alt={props.alt} />
        }
    }
}