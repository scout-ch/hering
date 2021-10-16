import { HashLink } from 'react-router-hash-link';
import { Role } from '../components/Chapter';


export function formatRoles(roles: Array<Role>): string {
    return roles.map((role) => role['rolle'].toUpperCase()).join(', ')
}
