import { Link } from 'react-router-dom';
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
        const link = props.href
        var found = link.match('\\$(.*)\\$');
        if (found) {
            //@ts-ignore
            // console.log('ggg', links[found[1]])
            //@ts-ignore
            // return <a href={links[found[1]]} target="_blank">{children}</a>
            return <a href={found[1]} target="_blank" rel="noreferrer">{children}</a>
        } else {
            return <Link to={props.href || ''}>{children}</Link>
        }
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