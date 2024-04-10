import React, {useState} from 'react'
import {SectionT} from '../../pages/section/components/Section'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {ChapterT} from '../../pages/section/components/Chapter'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {CalendarPageT} from '../../pages/calendar/CalendarPage'
import {useTranslation} from "react-i18next";
import {StartPageT} from '../../pages/home/HomePage';
import {faBars, faCalendarDays, faHome, faSearch} from "@fortawesome/free-solid-svg-icons";
import './nav.less'

type Props = {
    startPage: StartPageT
    calendarPage: CalendarPageT
    sections: SectionT[]
}

function Navigation(props: Props) {

    const sections = props.sections

    const {t} = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()

    const [navbarOpen, setNavbarOpen] = useState(false)
    const [checkedState, setCheckedState] = useState(
        new Array(sections.length).fill(false)
    );

    const handleOnChange = (sectionNav: any, section: SectionT) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === sectionNav ? !item : false
        );
        setCheckedState(updatedCheckedState)
        navigate('/' + section.slug)
    }

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

    function chapterList(section: SectionT) {
        const chapters = section.chapters
        const chapterItems = chapters.map((chapter: ChapterT) => {
            const isActive = location.hash.replace('#', '') === chapter.slug
            const className = isActive ? 'active' : ''
            return <li key={chapter.slug_with_section} className="subMenu" onClick={handleToggle}>
                <Link to={chapter.slug_with_section} className={className}>{chapter.menu_name}</Link>
            </li>
        })

        return <ul className="accordion_sub-menu">
            {chapterItems}
        </ul>
    }

    const sectionList = sections.map((section: SectionT, index: number) => {
        const isActive = location.pathname.replace('/', '') === section.slug
        const className = isActive ? 'active' : ''
        return <details key={section.slug} className={className} open={isActive}>
            <summary className={`accordion_label ${className}`}>
                {
                    isActive
                        ? <span>{section.menu_name}</span>
                        : <Link to={section.slug} onClick={handleToggle}>{section.menu_name}</Link>
                }
            </summary>
            {chapterList(section)}
        </details>
    })

    const homeActive = location.pathname === '/'
        ? 'active'
        : ''
    const calendarActive = location.pathname === '/calendar'
        ? 'active'
        : ''
    const searchActive = location.pathname === '/search'
        ? 'active' :
        ''

    return <nav className="header-nav">
        <button className="toggle-btn" onClick={handleToggle}>
            <FontAwesomeIcon icon={faBars}/> Menu
        </button>
        <div className={`header-nav-content ${navbarOpen ? "show-menu" : ""}`}>
            <ul className={"header-nav-primary"}>
                <li key="home" className={"primary-link " + homeActive}>
                    <Link to="/"
                          onClick={() => setNavbarOpen(!navbarOpen)}>
                        <FontAwesomeIcon icon={faHome}/>
                        {props.startPage.menu_name}
                    </Link>
                </li>
                <li key="search" className={"primary-link " + searchActive}>
                    <Link to="/search"
                          onClick={() => setNavbarOpen(!navbarOpen)}>
                        <FontAwesomeIcon icon={faSearch}/>
                        {t('searchPage.title')}
                    </Link>
                </li>
                <li key="calendar" className={"primary-link " + calendarActive}>
                    <Link to="/calendar"
                          onClick={() => setNavbarOpen(!navbarOpen)}>
                        <FontAwesomeIcon icon={faCalendarDays}/>
                        {props.calendarPage.menu_name}
                    </Link>
                </li>
            </ul>
            <ul className={`menu-items ${navbarOpen ? "show-menu" : ""}`}>
                {sectionList}
            </ul>
        </div>
    </nav>
}

export default Navigation