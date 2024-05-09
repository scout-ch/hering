import React, {createContext, lazy, Suspense, useEffect, useState} from 'react';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import i18n from './i18n';
import client from './client';
import {checkLinks} from './helper/LinkChecker';
import {StartPageT} from "./pages/home/HomePage";
import {CalendarPageT} from './pages/calendar/CalendarPage';
import {SectionsByKey, SectionT} from './pages/section/SectionPage';
import {ImpressumPageT} from './pages/impressum/ImpressumPage';
import Loading from "./components/loading/Loading";
import Navigation from "./components/navigation/Navigation";

const Footer = lazy(() => import('./components/footer/Footer'))
const SectionHashHelper = lazy(() => import('./helper/SectionHashHelper'))
const HomePage = lazy(() => import('./pages/home/HomePage'))
const ImpressumPage = lazy(() => import('./pages/impressum/ImpressumPage'))
const SectionPage = lazy(() => import('./pages/section/SectionPage'))
const CalendarPage = lazy(() => import('./pages/calendar/CalendarPage'))
const SearchPage = lazy(() => import('./pages/search/SearchPage'))

export type LinkT = {
    title: string
    link: string | undefined
    key: string
    slug: string | null
}

export const LinksContext = createContext<LinkT[]>([])

export default function App() {

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
            <Loading subtext={t('homePage.loading')}/>
        </div>
    }

    const sectionsByKey = sections.reduce((map: SectionsByKey, section: SectionT) => {
        map[section.slug] = section
        return map
    }, {})

    checkLinks(sections, links)

    return <div className='App'>
        <Router basename="/">
            <SectionHashHelper/>
            <LinksContext.Provider value={links}>
                <div className='header'>
                    <Navigation sections={sections} startPage={startPage} calendarPage={calendarPage}/>
                </div>

                <main id="main">
                    <Routes>
                        <Route path="/" element={
                            <Suspense fallback={<Loading centerInViewport={true}/>}>
                                <HomePage page={startPage}/>
                            </Suspense>
                        }/>
                        <Route path="/hering/" element={
                            <Suspense fallback={<Loading centerInViewport={true}/>}>
                                <HomePage page={startPage}/>
                            </Suspense>}/>
                        <Route path="search" element={
                            <Suspense fallback={<Loading centerInViewport={true}/>}>
                                <SearchPage sections={sections}/>
                            </Suspense>
                        }/>
                        <Route path="calendar" element={
                            <Suspense fallback={<Loading centerInViewport={true}/>}>
                                <CalendarPage page={calendarPage}/>
                            </Suspense>
                        }/>
                        <Route path="impressum" element={
                            <Suspense fallback={<Loading centerInViewport={true}/>}>
                                <ImpressumPage page={impressumPage}/>
                            </Suspense>
                        }/>
                        <Route path=":slug" element={
                            <Suspense fallback={<Loading centerInViewport={true}/>}>
                                <SectionPage sections={sectionsByKey}/>
                            </Suspense>
                        }/>
                    </Routes>

                    <Footer sections={sections}/>
                </main>
            </LinksContext.Provider>
        </Router>
    </div>
}