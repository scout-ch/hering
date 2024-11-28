import axios from "axios";
import { format } from "date-fns";
import axiosRetry from "axios-retry";

const client = axios.create({
    baseURL: 'https://openholidaysapi.org/',
    headers: {
        "Content-type": "application/json",
    },
});

axiosRetry(client, { retries: 5, retryDelay: axiosRetry.linearDelay(1000) });

export const loadSubdivisions = async (languageCode?: OHApiLanguageCode): Promise<OHApiSubdivision[]> => {
    const params = getBaseParams(languageCode);
    return (await client.get<OHApiSubdivision[]>('/subdivisions', { params: params })).data;
}

export const loadPublicHolidays = async (validFromDate: Date, validToDate: Date, languageCode?: OHApiLanguageCode): Promise<OHApiHoliday[]> => {
    const params = getBaseParams(languageCode);
    params.append('validFrom', format(validFromDate, 'yyyy-MM-dd'));
    params.append('validTo', format(validToDate, 'yyyy-MM-dd'));

    return (await client.get<OHApiHoliday[]>('/publicholidays', { params: params })).data;
}

export const loadSchoolHolidays = async (validFromDate: Date, validToDate: Date, languageCode?: OHApiLanguageCode): Promise<OHApiHoliday[]> => {
    const params = getBaseParams(languageCode);
    params.append('validFrom', format(validFromDate, 'yyyy-MM-dd'));
    params.append('validTo', format(validToDate, 'yyyy-MM-dd'));

    return (await client.get<OHApiHoliday[]>('/schoolholidays', { params: params })).data;
}

const getBaseParams = (languageCode?: OHApiLanguageCode): URLSearchParams => {
    const params = new URLSearchParams();
    params.append('countryIsoCode', 'CH');

    if (languageCode) {
        params.append('languageIsoCode', languageCode);
    }

    return params;
}

export const parseLanguageOrDefault = (lang: string): OHApiLanguageCode => {
    const openApiLanguageCode = lang.toUpperCase();
    return isValidLanguageCode(openApiLanguageCode)
        ? openApiLanguageCode as OHApiLanguageCode
        : 'EN';
}

const isValidLanguageCode = (code: string): boolean => code === 'DE' || code === 'FR' || code === 'IT' || code === 'EN';

export type OHApiLanguageCode = 'DE' | 'FR' | 'IT' | 'EN';

export interface OHApiSubdivision {
    name: OHApiLanguageText[];
    shortName: string;
    category: OHApiLanguageText[];
    code: string;
    isoCode: string;
    children: string[];
    officialLanguages: string[];
    comment: string | null;
}

export interface OHApiHoliday {
    id: string;
    name: OHApiLanguageText[];
    type: string;
    startDate: string;
    endDate: string;
    nationwide: boolean;
    regionalScope: string;
    temporalScope: string;
    subdivisions?: OHApiSubdivisionInfo[];
    comment?: OHApiLanguageText[];
}

export interface OHApiLanguageText {
    language: OHApiLanguageCode;
    text: string;
}

export interface OHApiSubdivisionInfo {
    code: string;
    shortName: string;
}
