import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './de.json'
import fr from './fr.json'
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  de: de,
  fr: fr
} as const;

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    supportedLngs: ['de', 'fr'],
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
