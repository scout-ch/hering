import { Link } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';
import Warning from '../components/Warning';

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
            return <a href={found} target="_blank">{children}</a>
        } else {
            return <Link to={props.href || ''}>{children}</Link>
        }
    }
}