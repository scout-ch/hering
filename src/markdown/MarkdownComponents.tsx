import { HashLink } from 'react-router-hash-link';


export const LinkComponent = {
    // @ts-ignore
    a({node, children, ...props}) {
        return <HashLink to={props.href || ''}>{children}</HashLink>
    }
}
