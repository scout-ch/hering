import React, { createContext, lazy, Suspense, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { checkLinks } from './helper/LinkChecker';
import { SectionsByKey } from './pages/section/SectionPage';
import Loading from "./components/loading/Loading";
import Navigation from "./components/navigation/Navigation";
import { HApiCalendarPage, HApiImpressumPage, HApiLink, HApiSection, HApiStartPage, loadCalendarPage, loadImpressumPage, loadLinks, loadSections, loadStartPage } from "./apis/hering-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

const Footer = lazy(() => import('./components/footer/Footer'))
const SectionHashHelper = lazy(() => import('./helper/SectionHashHelper'))
const HomePage = lazy(() => import('./pages/home/HomePage'))
const ImpressumPage = lazy(() => import('./pages/impressum/ImpressumPage'))
const SectionPage = lazy(() => import('./pages/section/SectionPage'))
const CalendarPage = lazy(() => import('./pages/calendar/CalendarPage'))
const SearchPage = lazy(() => import('./pages/search/SearchPage'))

export const LinksContext = createContext<HApiLink[]>([])

export default function App() {

    const lang = i18n.language
    const { t } = useTranslation()

    const [initError, setInitError] = useState<string | undefined>();
    const [sections, setSections] = useState<HApiSection[] | undefined>();
    const [links, setLinks] = useState<HApiLink[] | undefined>();
    const [startPage, setStartPage] = useState<HApiStartPage | undefined>();
    const [calendarPage, setCalendarPage] = useState<HApiCalendarPage | undefined>();
    const [impressumPage, setImpressumPage] = useState<HApiImpressumPage | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    loadSections(lang),
                    loadLinks(lang),
                    loadStartPage(lang),
                    loadCalendarPage(lang),
                    loadImpressumPage(lang)
                ])

                setSections(responses[0])
                setLinks(responses[1])
                setStartPage(responses[2])
                setCalendarPage(responses[3])
                setImpressumPage(responses[4])
            } catch (e: any) {
                if (!(e instanceof Error)) {
                    e = new Error(e);
                }

                setInitError(e.message ?? 'unknown');
            }
        }

        fetchData()
    }, [lang])

    if (initError) {
        return <div className='app-init error'>
            <FontAwesomeIcon icon={faBug} size="2x"/>
            <div>Es gab einen unerwarteten Fehler. Bitte versuche es später erneut.</div>
            <hr/>
            <div className="message">{initError}</div>
        </div>
    }

    if (!sections || !links || !startPage || !calendarPage || !impressumPage) {
        return <div className='app-init'>
            <Loading subtext={t('homePage.loading')} showWaitMessages={true}/>
        </div>
    }

    const sectionsByKey = sections.reduce((map: SectionsByKey, section: HApiSection) => {
        map[section.slug] = section
        return map
    }, {})

    checkLinks(sections, links)

    return <div className='app'>
        <Router basename="/">
            <SectionHashHelper/>
            <LinksContext.Provider value={links}>
                <Navigation sections={sections} startPage={startPage} calendarPage={calendarPage}/>
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