import axios from "axios";
import axiosRetry from "axios-retry";

const client = axios.create({
    baseURL: (window as any).env?.HERING_API_BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
});

axiosRetry(client, { retries: 5, retryDelay: axiosRetry.linearDelay(1000) });

export async function loadPage(key: string, lang: string): Promise<HApiPage> {
    const axiosResponse = await client.get<HApiResponse<HApiPage>>(`/pages/key/${key}?locale=${lang}`);
    return axiosResponse.data.data; // Strapi wraps the actual data in a data object
}

export async function loadSections(lang: string): Promise<HApiSection[]> {
    const sectionsRequestUrl = '/sections?' +
        'sort[0]=sorting:asc' +
        '&populate[chapters][fields][0]=title' +
        '&populate[chapters][fields][1]=content' +
        '&populate[chapters][fields][2]=menuName' +
        '&populate[chapters][populate][responsible][fields][0]=name' +
        '&populate[chapters][populate][responsible][fields][1]=abbreviation' +
        '&populate[chapters][populate][icon][fields][0]=url' +
        '&populate[chapters][populate][icon][fields][1]=mime' +
        '&fields[0]=title&fields[1]=menuName' +
        '&pagination[pageSize]=100' +
        '&pagination[page]=1' +
        '&status=published'
    const axiosResponse = await client.get<HApiResponse<HApiSection[]>>(`${sectionsRequestUrl}&locale=${lang}`);
    return axiosResponse.data.data;
}

export async function loadTasks(lang: string): Promise<HApiTask[]> {
    const tasksRequestUrl = '/tasks?' +
        'sort[0]=daysOffset:asc' +
        '&populate[targets][fields][0]=name' +
        '&populate[targets][fields][1]=abbreviation' +
        '&populate[responsible][fields][0]=name' +
        '&populate[responsible][fields][1]=abbreviation' +
        '&populate[chapter][fields][0]=id' +
        '&populate[chapter][populate][section][fields][0]=id' +
        '&fields[0]=id&fields[1]=title' +
        '&fields[2]=daysOffset' +
        '&pagination[pageSize]=100' +
        '&pagination[page]=1' +
        '&status=published'

    const axiosResponse = await client.get<HApiResponse<HApiTask[]>>(`${tasksRequestUrl}&locale=${lang}`);
    return axiosResponse.data.data;
}

export interface HApiResponse<T> {
    data: T
    meta: any
}

export interface HApiIdentifier {
    documentId: string
}

export interface HApiPage {
    title: string
    content: string
}

export interface HApiSection extends HApiIdentifier {
    title: string
    menuName: string
    chapters: HApiChapter[]
}

export interface HApiChapter extends HApiIdentifier {
    title: string
    menuName: string
    content: string
    icon: HApiIcon
    responsible: HApiRole[]
}

export interface HApiIcon extends HApiIdentifier {
    url: string
    mime: string
}

export interface HApiRole extends HApiIdentifier {
    name: string
    abbreviation: string
}

export interface HApiTask extends HApiIdentifier {
    title: string
    daysOffset: number
    targets: HApiRole[]
    responsible: HApiRole[]
    chapter: HApiTaskChapter
}

export interface HApiTaskChapter extends HApiIdentifier {
    section: HApiIdentifier
}