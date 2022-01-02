import React from 'react'
import { SectionT } from './Section'
import { Link } from 'react-router-dom'
import { ChapterT } from './Chapter'
import { HashLink } from 'react-router-hash-link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    sections: Array<SectionT>
}

function Navigation(props: Props) {

    const [navbarOpen, setNavbarOpen] = useState(false)

    const sections = props.sections
    const [checkedState, setCheckedState] = useState(
        new Array(sections.length).fill(false)
    );

    const handleOnChange = (sectionNav: any) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === sectionNav ? true : false
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
                    <img src={section.icon ? section.icon.url : ''} width="25" alt="icon" />
                    {section.menu_name}
                </label>
                {chapterList(section)}
            </li>
        </>
    })
    return <nav>
        <div className="toggle-btn">
            <i onClick={handleToggle}><FontAwesomeIcon icon="bars"/></i>
        </div>
        <ul className={`menuItems ${navbarOpen ? " showMenu" : ""}`}>
            <li key="home"><Link to="/">HERING</Link></li>
            {sectionList}
            <li key="calendar">
                <Link to="/calendar">KALENDER</Link>
            </li>
        </ul>
    </nav>
}

export default Navigation