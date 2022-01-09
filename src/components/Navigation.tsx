import React from 'react'
import { SectionT } from './Section'
import { Link } from 'react-router-dom'
import { ChapterT } from './Chapter'
import { HashLink } from 'react-router-hash-link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StartPage } from '../pages/HomePage '
import { CalendarPageT } from '../pages/CalendarPage'

type Props = {
    sections: Array<SectionT>
    startPage: StartPage
    calendarPage: CalendarPageT
}

function Navigation(props: Props) {

    const [navbarOpen, setNavbarOpen] = useState(false)

    const sections = props.sections
    const [checkedState, setCheckedState] = useState(
        new Array(sections.length).fill(false)
    );

    const handleOnChange = (sectionNav: any) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === sectionNav ? !item : false
        );
        setCheckedState(updatedCheckedState);
    }

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

    function chapterList(section: SectionT) {
        const chapters = section.chapters
        const chapterItems = chapters.map(function (chapter: ChapterT) {
            return <li className="subMenu" key={chapter.slug} onClick={handleToggle}>
                <HashLink to={chapter.slug_with_section}>{chapter.menu_name}</HashLink>
            </li>
        })
        return <ul className="accordion_sub-menu">
            {chapterItems}
        </ul>
    }

    const sectionList = sections.map(function (section: SectionT, index: number) {
        return <>
            <li key={section.slug}>
                <input
                    type="checkbox"
                    name="tabs"
                    id={section.slug}
                    className="accordion_input"
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                />
                <label htmlFor={section.slug} className="accordion_label">
                    {section.icon && (<img src={section.icon.url} width="25" alt="icon" />)}
                    {section.menu_name}
                </label>
                {chapterList(section)}
            </li>
        </>
    })
    const startPage = props.startPage
    const calendarPage = props.calendarPage
    return <nav className="header-nav">
        <div className="toggle-btn">
            <i onClick={handleToggle}><FontAwesomeIcon icon="bars" /></i>
        </div>
        <div className='header-nav-content'>
            <ul className={`menuItems ${navbarOpen ? " showMenu" : ""}`}>
                <li key="home">
                    {/* <img src={startPage.icon ? startPage.icon.url : ''} width="25" alt="icon" />  */}
                    <Link to="/">{startPage.menu_name}</Link>
                </li>
                {sectionList}
                <li key="calendar">
                    <Link to="/calendar">{calendarPage.menu_name}</Link>
                </li>
            </ul>
        </div>
    </nav>
}

export default Navigation