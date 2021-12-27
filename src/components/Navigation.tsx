import React from 'react'
import { SectionT } from './Section'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    sections: Array<SectionT>
}

function Navigation(props: Props) {
    const sections = props.sections
    const sectionList =  sections.map(function(section: SectionT){
        return <li className="with-icon" key={section.slug}>
            <img src={section.icon ? section.icon.url : ''} width="25" />
            <Link to={section.slug}>{section.menu_name}</Link>
            </li>
    })
    return <nav>
        <ul>
            <li><Link to="/">HERING</Link></li>
            {sectionList}
            <li><Link to="/calendar"><FontAwesomeIcon icon="calendar" /> {('calendarPage.title')}</Link></li>
        </ul>
    </nav>
}

export default Navigation