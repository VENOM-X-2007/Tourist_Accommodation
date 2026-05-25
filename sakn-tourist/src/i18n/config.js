import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ar from '../locales/ar.json';
import fr from '../locales/fr.json';
import en from '../locales/en.json';

const resources = {
  ar: { translation: ar },
  fr: { translation: fr },
  en: { translation: en },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    debug: false,
    interpolation: {
      escapeValue: true,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  localStorage.setItem('i18nextLng', lang);
};

export const getCurrentLanguage = () => i18n.language;

export const isRTL = () => i18n.language === 'ar';

export default i18n;
