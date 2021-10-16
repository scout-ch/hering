import { HashLink } from 'react-router-hash-link';
import Warning from '../components/Warning';

export const LinkComponent = {
    // @ts-ignore
    blockquote({node, children, ...props}) {
        return <Warning content={children}/>
    },
    // @ts-ignore
    a({node, children, ...props}) {
        return <HashLink to={props.href || ''}>{children}</HashLink>
    }
}