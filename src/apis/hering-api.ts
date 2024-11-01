import axios from "axios";

const client = axios.create({
    // baseURL: 'http://localhost:1337/',
    baseURL: 'https://hering-api.herokuapp.com/',
    headers: {
        "Content-type": "application/json",
    },
});

const getData = async <T>(url: string): Promise<T> => {
    const response = await client.get(url);
    return response.data as T;
};

export const loadStartPage = async (lang: string): Promise<HApiStartPage> => {
    return await getData<HApiStartPage>(`/start-page?_locale=${lang}`)
}

export const loadCalendarPage = async (lang: string): Promise<HApiCalendarPage> => {
    return await getData<HApiCalendarPage>(`/calendar-page?_locale=${lang}`)
}

export const loadImpressumPage = async (lang: string): Promise<HApiImpressumPage> => {
    return await getData<HApiImpressumPage>(`/impressum-page?_locale=${lang}`)
}

export const loadSections = async (lang: string): Promise<HApiSection[]> => {
    return await getData<HApiSection[]>(`/sections?_sort=sorting:ASC&_locale=${lang}`)
};

export const loadLinks = async (lang: string): Promise<HApiLink[]> => {
    return await getData<HApiLink[]>(`/links?_locale=${lang}`)
}

export const loadTasks = async (lang: string): Promise<HApiTask[]> => {
    return await getData<HApiTask[]>(`/tasks?_locale=${lang}`)
}

export interface HApiStartPage {
    title: string
    menu_name: string
    icon: HApiIcon
    content: string
}

export interface HApiCalendarPage {
    title: string
    menu_name: string
    icon: HApiIcon
    content: string
}

export interface HApiImpressumPage {
    title: string
    menu_name: string
    content: string
}

export interface HApiSection {
    chapters: HApiChapter[]
    sorting: number
    title: string
    content: string
    slug: string
    menu_name: string
    localizations: any
}

export interface HApiChapter {
    id: number
    sorting: number
    title: string
    menu_name: string
    content: string
    slug: string
    slug_with_section: string
    icon: HApiIcon
    section: HApiSection
    responsible: HApiRole[]
}

export interface HApiRole {
    rolle: string
}

export interface HApiLink {
    title: string
    link: string | undefined
    key: string
    slug: string | null
}

export interface HApiTask {
    id: number
    title: string
    days: number
    responsible: HApiRoles[]
    targets: HApiRoles[]
    chapters: HApiChapter[]
}

export interface HApiRoles {
    rolle: string
}

export interface HApiIcon {
    url: string
    mime: string
}