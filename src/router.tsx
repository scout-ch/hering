import { lazy, Suspense } from 'react'
import { createRootRoute, createRoute, createRouter, Outlet, redirect, } from '@tanstack/react-router'
import { i18n } from './i18n'
import Loading from './components/loading/Loading'
import Navigation from './components/navigation/Navigation'
import LegacyUrlRedirectHelper from './helper/LegacyUrlRedirectHelper'

const SectionHashScroller = lazy(() => import('./helper/SectionHashScroller'))
const Footer = lazy(() => import('./components/footer/Footer'))
const HomePage = lazy(() => import('./pages/home/HomePage'))
const SearchPage = lazy(() => import('./pages/search/SearchPage'))
const CalendarPage = lazy(() => import('./pages/calendar/CalendarPage'))
const ImpressumPage = lazy(() => import('./pages/impressum/ImpressumPage'))
const SectionPage = lazy(() => import('./pages/section/SectionPage'))

const rootRoute = createRootRoute({
    component: () => (
        <>
            <SectionHashScroller/>
            <LegacyUrlRedirectHelper/>
            <Navigation/>
            <main id="main">
                <Outlet/>
                <Footer/>
            </main>
        </>
    ),
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => (
        <Suspense fallback={<Loading centerInViewport={true}/>}>
            <HomePage/>
        </Suspense>
    ),
})

export type SearchParams = {
    keyword?: string
}

const searchRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/search',
    validateSearch: (search: Record<string, unknown>): SearchParams => ({
        keyword: typeof search.keyword === 'string'
            ? search.keyword
            : undefined,
    }),
    component: () => (
        <Suspense fallback={<Loading centerInViewport={true}/>}>
            <SearchPage/>
        </Suspense>
    ),
})

const calendarRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/calendar',
    component: () => (
        <Suspense fallback={<Loading centerInViewport={true}/>}>
            <CalendarPage/>
        </Suspense>
    ),
})

const impressumRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/impressum',
    component: () => (
        <Suspense fallback={<Loading centerInViewport={true}/>}>
            <ImpressumPage/>
        </Suspense>
    ),
})

const sectionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/$sectionId',
    component: () => (
        <Suspense fallback={<Loading centerInViewport={true}/>}>
            <SectionPage/>
        </Suspense>
    ),
})

const catchAllRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '$',
    beforeLoad: () => {
        throw redirect({ to: '/' })
    },
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    searchRoute,
    calendarRoute,
    impressumRoute,
    sectionRoute,
    catchAllRoute,
])

const lang = i18n.language

export const router = createRouter({
    routeTree,
    basepath: `/${lang}`,
    defaultPreload: 'intent',
    defaultHashScrollIntoView: false,
})

export { searchRoute, sectionRoute }
