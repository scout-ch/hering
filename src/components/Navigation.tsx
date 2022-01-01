import React from 'react'
import { SectionT } from './Section'
import { Link } from 'react-router-dom'
import { ChapterT } from './Chapter'
import { HashLink } from 'react-router-hash-link'
import { useState } from 'react'

type Props = {
    sections: Array<SectionT>
}

function chapterList(section: SectionT) {
    const chapters = section.chapters
    const chapterItems = chapters.map(function (chapter: ChapterT) {
        return <li className="subMenu" key={chapter.slug}>
            <HashLink to={chapter.slug_with_section}>{chapter.title}</HashLink>
        </li>
    })
    return <ul className="accordion_sub-menu">
        {chapterItems}
    </ul>
}

function Navigation(props: Props) {
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
                    {/* <Link to={section.slug}>{section.menu_name}</Link> */}
                </label>
                {chapterList(section)}
            </li>
        </>
    })
    return <nav>
        <ul>
            <li key="home"><Link to="/">HERING</Link></li>
            {sectionList}
            <li key="calendar">
                <Link to="/calendar">KALENDER</Link>
            </li>
        </ul>
    </nav>
}

export default Navigation