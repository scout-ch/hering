import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import {faBars, faCalendar, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import HomePage from './pages/HomePage ';
import CalendarPage from './pages/CalendarPage';
import i18n from './i18n';
import {withTranslation} from 'react-i18next';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SectionPage from './pages/SectionPage';
import ImpressumPage from './pages/ImpressumPage';
import {checkLinks} from './helper/LinkChecker';
import client from './client';
import {SectionT} from "./components/Section";
import SectionHashHelper from "./helper/SectionHashHelper";

export type LinkT = {
    title: string
    link: string | undefined
    key: string
    slug: string | null
}

export const LinksContext = createContext<LinkT[]>([])

function App() {

    const lang = i18n.language
    const [sections, setSections] = useState(null);
    const [links, setLinks] = useState(null);
    const [startPage, setStartPage] = useState(null);
    const [calendarPage, setCalendarPage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const sectionsPromise = client.get('/sections?_sort=sorting:ASC&_locale=' + lang)
            const linksPromise = client.get('/links?_locale=' + lang)
            const startPagePromise = client.get('/start-page?_locale=' + lang)
            const calendarPromise = client.get('/calendar-page?_locale=' + lang)

            await new Promise(resolve => {
                setTimeout(() => resolve(''), 10000)
            })

            const responses = await Promise.all([
                sectionsPromise,
                linksPromise,
                startPagePromise,
                calendarPromise])

            setSections(responses[0].data)
            setLinks(responses[1].data)
            setStartPage(responses[2].data)
            setCalendarPage(responses[3].data)
        }

        fetchData()
    }, [lang])

    library.add(faCalendar, faExclamationTriangle, faBars)

    if (!sections || !links || !startPage || !calendarPage) {
        return <div className='loading'>
            <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div>
                Hering wird vorbereitet...
            </div>
        </div>
    }

    //@ts-ignore
    const sectionsByKey = sections.reduce(function (map, section: SectionT) {
        map[section.slug] = section
        return map
    }, {})

    checkLinks(sections, links)

    return <div className='App'>
        <Router basename="/">
            <SectionHashHelper/>
            <LinksContext.Provider value={links}>
                <div className='header'>
                    <Navigation sections={sections} startPage={startPage} calendarPage={calendarPage}></Navigation>
                </div>

                <main>
                    <Routes>
                        <Route path="/" element={<HomePage page={startPage}/>}/>
                        <Route path="calendar" element={<CalendarPage page={calendarPage}/>}/>
                        <Route path="impressum" element={<ImpressumPage/>}/>
                        <Route path=":slug" element={<SectionPage sections={sectionsByKey}/>}/>
                    </Routes>

                    <div className='footer'>
                        <Footer lang={lang} sections={sections}/>
                    </div>
                </main>

            </LinksContext.Provider>
        </Router>
    </div>
}

export default withTranslation()(App);
