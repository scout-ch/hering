import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { i18n } from './i18n';
import Loading from "./components/loading/Loading";
import Navigation from "./components/navigation/Navigation";
import LegacyUrlRedirectHelper from "./helper/LegacyUrlRedirectHelper";
import { useDocumentTitle } from "./components/page-title";

const Footer = lazy(() => import('./components/footer/Footer'))
const SectionHashScroller = lazy(() => import('./helper/SectionHashScroller'))
const HomePage = lazy(() => import('./pages/home/HomePage'))
const ImpressumPage = lazy(() => import('./pages/impressum/ImpressumPage'))
const SectionPage = lazy(() => import('./pages/section/SectionPage'))
const CalendarPage = lazy(() => import('./pages/calendar/CalendarPage'))
const SearchPage = lazy(() => import('./pages/search/SearchPage'))

export default function App() {

    const lang = i18n.language
    const { t } = useTranslation()
    const { setBaseTitle } = useDocumentTitle();

    useEffect(() => {
        setBaseTitle(t('homePage.title'));
    }, [lang])

    if (!i18n.isInitialized) {
        return <div className='app-init'>
            <Loading subtext={t('homePage.loading', 'Loading...')} showWaitMessages={true}/>
        </div>
    }

    return <div className='app'>
        <Router basename={`/${lang}`}>
            <SectionHashScroller/>
            <LegacyUrlRedirectHelper/>

            <Navigation/>

            <main id="main">
                <Routes>
                    <Route index element={
                        <Suspense fallback={<Loading centerInViewport={true}/>}>
                            <HomePage/>
                        </Suspense>
                    }/>

                    <Route path="search" element={
                        <Suspense fallback={<Loading centerInViewport={true}/>}>
                            <SearchPage/>
                        </Suspense>
                    }/>
                    <Route path="calendar" element={
                        <Suspense fallback={<Loading centerInViewport={true}/>}>
                            <CalendarPage/>
                        </Suspense>
                    }/>
                    <Route path="impressum" element={
                        <Suspense fallback={<Loading centerInViewport={true}/>}>
                            <ImpressumPage/>
                        </Suspense>
                    }/>
                    <Route path=":sectionId" element={
                        <Suspense fallback={<Loading centerInViewport={true}/>}>
                            <SectionPage/>
                        </Suspense>
                    }/>

                    <Route path="*" element={<Navigate to={`/`}/>}/>
                </Routes>

                <Footer/>
            </main>
        </Router>
    </div>
}