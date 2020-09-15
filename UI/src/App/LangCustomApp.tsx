import React from 'react';
import { RouteComponentProps } from 'react-router';

import LangApp from './LangApp';

import { availablesLangs, defaultLang } from './helpers/language';


export type LangCustomAppProps = RouteComponentProps<{ lang: string }> & {
    overrideLang: string;
}
/**
 * Override browser locale lang for route lang.
 * @param props 
 */
function LangCustomApp(props: LangCustomAppProps) {
    const { match, overrideLang, ...rest } = props;
    const newLang: string = match.params.lang?.toLowerCase();

    const currLang = (newLang && availablesLangs[newLang]) ? newLang : (availablesLangs[overrideLang] ? overrideLang : defaultLang);
    
    // #region Render
    // ========================================== Render =========================================
    return (
        <LangApp {...rest} match={match} lang={currLang} />
    )
    // #endregion
}

export default LangCustomApp;