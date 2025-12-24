import type { InitOptions } from 'i18next';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { datetime } from './src/i18n/formatters';

export const FALLBACK_LANGUAGE = 'en';

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: FALLBACK_LANGUAGE,
    debug: false, //process.env.NODE_ENV === 'development',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    interpolation: {
      escapeValue: false
    },
    pluralization: {
      enabled: true
    }
  } as InitOptions);

i18n.services?.formatter?.add('datetime', datetime);

export default i18n;
