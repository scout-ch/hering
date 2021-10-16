import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './de.json'
import fr from './fr.json'

const resources = {
  de: de,
  fr: fr
} as const;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'de', 
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
