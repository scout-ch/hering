import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import {
    faBars,
    faCalendarDays,
    faCircleInfo,
    faExclamationTriangle,
    faHome,
    faSearch
} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import HomePage, {StartPageT} from './pages/HomePage ';
import CalendarPage, {CalendarPageT} from './pages/CalendarPage';
import i18n from './i18n';
import {useTranslation} from 'react-i18next';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SectionPage, {SectionsByKey} from './pages/SectionPage';
import ImpressumPage, {ImpressumPageT} from './pages/ImpressumPage';
import {checkLinks} from './helper/LinkChecker';
import client from './client';
import {SectionT} from "./components/Section";
import SectionHashHelper from "./helper/SectionHashHelper";
import SearchPage from "./pages/SearchPage";
import Loading from "./components/Loading";
import LegacyUrlRedirectHelper from "./helper/LegacyUrlRedirectHelper";

export type LinkT = {
    title: string
    link: string | undefined
    key: string
    slug: string | null
}

export const LinksContext = createContext<LinkT[]>([])

// Font Awesome Icons
library.add(faCalendarDays, faExclamationTriangle, faBars, faSearch, faHome, faCircleInfo)

function App() {

    const lang = i18n.language
    const {t} = useTranslation()

    const [sections, setSections] = useState<SectionT[] | undefined>();
    const [links, setLinks] = useState<LinkT[] | undefined>();
    const [startPage, setStartPage] = useState<StartPageT | undefined>();
    const [calendarPage, setCalendarPage] = useState<CalendarPageT | undefined>();
    const [impressumPage, setImpressumPage] = useState<ImpressumPageT | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            const responses = await Promise.all([
                client.get('/sections?_sort=sorting:ASC&_locale=' + lang),
                client.get('/links?_locale=' + lang),
                client.get('/start-page?_locale=' + lang),
                client.get('/calendar-page?_locale=' + lang),
                client.get('/impressum-page?_locale=' + lang)])

            setSections(responses[0].data)
            setLinks(responses[1].data)
            setStartPage(responses[2].data)
            setCalendarPage(responses[3].data)
            setImpressumPage(responses[4].data)
        }

        fetchData()
    }, [lang])

    if (!sections || !links || !startPage || !calendarPage || !impressumPage) {
        return <div className='app-loading'>
            <Loading isLoading={true}></Loading>
            <div>
                {t('homePage.loading')}
            </div>
        </div>
    }

    const sectionsByKey = sections.reduce((map: SectionsByKey, section: SectionT) => {
        map[section.slug] = section
        return map
    }, {})

    checkLinks(sections, links)

    return <div className='App'>
        <Router basename="/">
            <LegacyUrlRedirectHelper/>
            <SectionHashHelper/>
            <LinksContext.Provider value={links}>
                <div className='header'>
                    <Navigation sections={sections} startPage={startPage} calendarPage={calendarPage}></Navigation>
                </div>

                <main>
                    <Routes>
                        <Route path="/" element={<HomePage page={startPage}/>}/>
                        <Route path="search" element={<SearchPage sections={sections}/>}/>
                        <Route path="calendar" element={<CalendarPage page={calendarPage}/>}/>
                        <Route path="impressum" element={<ImpressumPage page={impressumPage} />}/>
                        <Route path=":slug" element={<SectionPage sections={sectionsByKey}/>}/>
                    </Routes>

                    <div className='footer'>
                        <Footer sections={sections}/>
                    </div>
                </main>
            </LinksContext.Provider>
        </Router>
    </div>
}

export default App;
