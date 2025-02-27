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
} as const;

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        supportedLngs: ['de', 'fr', 'it'],
        fallbackLng: 'de',
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

export default i18n;
