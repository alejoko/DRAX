import { Locale } from 'antd/lib/locale-provider';
import { PickerLocale } from 'antd/lib/date-picker/generatePicker';


export type LangInfo = {
    locale: string;
    antd: () => Promise<{ default: Locale | PickerLocale }>;
    intl: () => Promise<{ default: Record<string, string> }>;
    moment: () => Promise<any>;
}
/** Default lang for this application */
export const defaultLang: string = 'en';
/** Contains all avalidable langaje for this site. */
export const availablesLangs: { [key: string]: LangInfo } = {
    en: {
        antd: () => import(/* webpackChunkName: "antd-en_US" */'antd/lib/calendar/locale/en_US'),
        intl: () => import(/* webpackChunkName: "int-en_US" */'src/translations/en.json'),
        moment: () => Promise.resolve(),
        locale: 'en',
    },
    es: {
        antd: () => import(/* webpackChunkName: "antd-es_ES" */'antd/lib/calendar/locale/es_ES'),
        intl: () => import(/* webpackChunkName: "int-es_ES" */'src/translations/es.json'),
        moment: () => import(/* webpackChunkName: "moment-es_ES" */'moment/locale/es'),
        locale: 'es',
    },
}
export const loadingText: { [key: string]: string } = {
    en: 'Loading ...',
    es: 'Cargando ...'
}

/**
 * Get language defined by browser.
 */
export function getBrowserLang() {
    if (navigator.languages !== undefined) {
        if (navigator.languages.length === 2) {
            return navigator.languages[1];
        } else
            return navigator.languages[0].split('-')[0];
    }
    return defaultLang;
}