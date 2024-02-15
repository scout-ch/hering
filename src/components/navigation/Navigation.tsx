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
        return <li key={section.slug} className={className}>
            <input
                type="checkbox"
                name="tabs"
                id={section.slug}
                className={`accordion_input ${className}`}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index, section)}
            />
            <label htmlFor={section.slug} className={`accordion_label ${className}`}>
                {section.menu_name}
            </label>
            {chapterList(section)}
        </li>
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
        <div className="toggle-btn">
            <i onClick={handleToggle}>
                <FontAwesomeIcon icon={faBars}/>
            </i>
        </div>
        <div className={`header-nav-content ${navbarOpen ? "show-menu" : ""}`}>
            <div className={"header-nav-primary"}>
                <div key="home" className={"primary-link"}>
                    <Link to="/" className={homeActive + ''}
                          onClick={() => setNavbarOpen(!navbarOpen)}>
                        <FontAwesomeIcon icon={faHome}/>
                        {props.startPage.menu_name}
                    </Link>
                </div>
                <div key="search" className={"primary-link"}>
                    <Link to="/search" className={searchActive}
                          onClick={() => setNavbarOpen(!navbarOpen)}>
                        <FontAwesomeIcon icon={faSearch}/>
                        {t('searchPage.title')}
                    </Link>
                </div>
                <div key="calendar" className={"primary-link"}>
                    <Link to="/calendar" className={calendarActive}
                          onClick={() => setNavbarOpen(!navbarOpen)}>
                        <FontAwesomeIcon icon={faCalendarDays}/>
                        {props.calendarPage.menu_name}
                    </Link>
                </div>
            </div>

            <hr/>

            <ul className={`menu-items ${navbarOpen ? "show-menu" : ""}`}>
                {sectionList}
            </ul>
        </div>
    </nav>
}

export default Navigation