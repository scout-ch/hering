import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChapterT } from '../../pages/section/components/Chapter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CalendarPageT } from '../../pages/calendar/CalendarPage'
import { useTranslation } from "react-i18next";
import { StartPageT } from '../../pages/home/HomePage';
import { faBars, faCalendarDays, faFishFins, faSearch } from "@fortawesome/free-solid-svg-icons";
import './nav.less'
import { SectionT } from "../../pages/section/SectionPage";
import { CHAPTER_NAV_UPDATED_EVENT } from "../../shared/constants";

type Props = {
    startPage: StartPageT
    calendarPage: CalendarPageT
    sections: SectionT[]
}

function Navigation({ startPage, calendarPage, sections }: Props) {

    const { t } = useTranslation()
    const location = useLocation()
    const [currentChapterSlug, setCurrentChapterSlug] = useState('')
    const [navbarOpen, setNavbarOpen] = useState(false)
    const sidebarRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setNavbarOpen(false);
        }
    };

    useEffect(() => {
        const updateSlug = (event: Event) => {
            if (event instanceof CustomEvent) {
                setCurrentChapterSlug(event.detail.chapterSlug)
            }
        }

        window.addEventListener(CHAPTER_NAV_UPDATED_EVENT, updateSlug)
        return () => {
            window.removeEventListener(CHAPTER_NAV_UPDATED_EVENT, updateSlug)
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (location.hash.length > 0) {
            setCurrentChapterSlug(location.hash.replace('#', ''))
        } else {
            // If navigation is not based on a hash / chapter, scoll back to top
            window.scrollTo(0, 0)
        }
    }, [location]);

    function chapterList(section: SectionT) {
        const chapters = section.chapters
        const chapterItems = chapters.map((chapter: ChapterT) => {
            const isActive = currentChapterSlug === chapter.slug
            return <li key={chapter.slug_with_section} className="subMenu" onClick={handleToggle}>
                <Link to={chapter.slug_with_section} className={isActive ? 'active' : ''}>{chapter.menu_name}</Link>
            </li>
        })

        return <ul className="accordion_sub-menu">
            {chapterItems}
        </ul>
    }

    const sectionList = sections.map((section: SectionT) => {
        const isActive = location.pathname.replace('/', '') === section.slug
        const className = isActive ? 'active' : ''
        return <details key={section.slug} className={className} open={isActive}>
            <summary className={`accordion_label ${className}`}>
                {
                    isActive
                        ? <span className="cursor-pointer">{section.menu_name}</span>
                        : <Link to={section.slug}>{section.menu_name}</Link>
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

    return <div ref={sidebarRef}>
        <div className="mobile-header">
            <button className="mobile-menu-btn" onClick={handleToggle}>
                <FontAwesomeIcon icon={faBars}/> Menu
            </button>
        </div>
        <div className='sidebar'>
            <nav className={`header-nav ${navbarOpen ? "active" : ""}`}>
                <div className={`header-nav-content`}>
                    <ul className={"header-nav-primary"}>
                        <li key="home" className={"primary-link " + homeActive}>
                            <Link to="/"
                                  onClick={() => setNavbarOpen(!navbarOpen)}>
                                <FontAwesomeIcon icon={faFishFins}/>
                                {startPage.menu_name}
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
                                {calendarPage.menu_name}
                            </Link>
                        </li>
                    </ul>
                    <ul className={`menu-items ${navbarOpen ? "show-menu" : ""}`}>
                        {sectionList}
                    </ul>
                </div>
            </nav>
        </div>
    </div>
}

export default Navigation