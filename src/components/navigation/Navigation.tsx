import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from "react-i18next";
import { faBars, faCalendarDays, faFishFins, faSearch } from "@fortawesome/free-solid-svg-icons";
import './nav.less'
import { CHAPTER_NAV_UPDATED_EVENT } from "../../shared/constants";
import { HApiCalendarPage, HApiChapter, HApiSection, HApiStartPage } from "../../apis/hering-api";
import { useDocumentTitle } from "../page-title";

type Props = {
    startPage: HApiStartPage
    calendarPage: HApiCalendarPage
    sections: HApiSection[]
}

function Navigation({ startPage, calendarPage, sections }: Props) {

    const { t } = useTranslation()
    const location = useLocation()
    const { setPageTitle } = useDocumentTitle();

    const [navbarOpen, setNavbarOpen] = useState(false)
    const [currentChapterId, setCurrentChapterId] = useState('')
    const [pathname, setPathname] = useState('')

    const sidebarRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setNavbarOpen(false);
        }
    };

    const chapterLookup = useMemo(() => {
        return sections
            .flatMap(section => section.chapters)
            .reduce((lookup, chapter) => {
                lookup[chapter.documentId] = chapter;
                return lookup;
            }, {} as Record<string, HApiChapter>);
    }, [sections]);

    useEffect(() => {
        const updateChapter = (event: Event) => {
            if (event instanceof CustomEvent) {
                const chapterId = event.detail.chapterId ?? '';
                setCurrentChapterId(chapterId);

                const currentChapter = chapterLookup[chapterId];
                if (currentChapter) {
                    setPageTitle(currentChapter.menuName);
                }
            }
        }

        window.addEventListener(CHAPTER_NAV_UPDATED_EVENT, updateChapter)
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener(CHAPTER_NAV_UPDATED_EVENT, updateChapter)
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    useEffect(() => {
        const cleanPathname = decodeURIComponent(location.pathname);
        const pathWithoutHash = cleanPathname.indexOf('#') === -1
            ? cleanPathname
            : cleanPathname.slice(0, cleanPathname.indexOf('#'));
        setPathname(pathWithoutHash)
    }, [location.pathname]);

    function chapterList(section: HApiSection) {
        const chapterItems = section.chapters.map((chapter: HApiChapter) => {
            const isActive = currentChapterId === chapter.documentId

            return <li key={chapter.documentId} className="subMenu" onClick={handleToggle}>
                <Link to={`${section.documentId}#${chapter.documentId}`}
                      className={isActive ? 'active' : ''}>{chapter.menuName}</Link>
            </li>
        })

        return <ul className="accordion_sub-menu">
            {chapterItems}
        </ul>
    }

    const sectionList = sections.map((section: HApiSection) => {
        const isActive = pathname.replace('/', '') === section.documentId
        const className = isActive ? 'active' : ''

        return <details key={section.documentId} className={className} open={isActive}>
            <summary className={`accordion_label ${className}`}>
                {
                    isActive
                        ? <span className="cursor-pointer">{section.menuName}</span>
                        : <Link to={section.documentId}>{section.menuName}</Link>
                }
            </summary>
            {chapterList(section)}
        </details>
    })

    const homeActive = pathname === '/'
        ? 'active'
        : ''
    const calendarActive = pathname === '/calendar'
        ? 'active'
        : ''
    const searchActive = pathname === '/search'
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
                                {startPage.menuName}
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
                                {calendarPage.menuName}
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