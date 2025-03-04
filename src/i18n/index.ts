import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsGerman from './de.json'
import translationsFrench from './fr.json'
import translationsItalian from './it.json'
import LanguageDetector from 'i18next-browser-languagedetector';
import { setDefaultOptions } from "date-fns";
import { de, fr, it } from "date-fns/locale";

const resources = {
    de: translationsGerman,
    fr: translationsFrench,
    it: translationsItalian
};

const supportedLanguages = ['de', 'fr', 'it'];
const defaultLanguage = 'de';

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: defaultLanguage,
        supportedLngs: supportedLanguages,
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['path', 'localStorage', 'navigator'],
            caches: ['localStorage']
        }
    });

setDefaultOptions({
    locale: i18n.language === 'de'
        ? de
        : i18n.language === 'fr'
            ? fr
            : i18n.language === 'it'
                ? it
                : de
});

function getUrlPathSegments(): string[] {
    return `${window.location.pathname}${window.location.hash}`.split('/').filter(p => !!p && p.length > 0);
}

function redirectToLanguage(lang: string) {
    const pathWithoutLanguage = getUrlPathSegments().slice(1).join('/');
    const newPath = `/${lang}${pathWithoutLanguage ? `/${pathWithoutLanguage}` : ''}`;

    window.location.replace(newPath);
}

function getLanguageFromUrl(): string {
    return getUrlPathSegments()[0] || '';
}

export { i18n, supportedLanguages, defaultLanguage, redirectToLanguage, getLanguageFromUrl };
