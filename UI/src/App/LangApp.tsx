import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import AppContainer from './AppContainer';
import Loader from './components/Loader';

import { availablesLangs, defaultLang, loadingText } from 'src/App/helpers/language';

import { AppActions, AppStore } from 'src/App/redux/actions';

type Language = {
    locale: string;
    intlMessages: Record<string, string>;
}
export type LangAppProps = RouteComponentProps<{ lang: string }> & {
    /** Language provider for parent component. */
    lang: string;
    /** Language store in the global store. */
    stApp: AppStore;
    /** Update global store language */
    changeLang: (lang: string, byUser: boolean) => void;
}

function LangApp(props: LangAppProps) {
    const { lang, stApp, changeLang, ...rest } = props;
    const [currLang, setCurrLang] = useState<Language>();

    useEffect(() => {
        (async () => {
            const curr = availablesLangs[lang] || availablesLangs[defaultLang];
            const [intlLocale] = await Promise.all([curr.intl(), curr.moment()]);

            changeLang(curr.locale, !!rest.match.params.lang);
            moment.locale(curr.locale);

            setCurrLang({
                locale: curr.locale,
                intlMessages: intlLocale.default,
            });
        })()
    }, [lang, changeLang, rest.match.params.lang]);

    if (!currLang || !stApp) {
        return (
            <Loader loading={true} text={loadingText[lang] || loadingText[defaultLang]} />
        )
    }
    return (
        <IntlProvider locale={currLang.locale} messages={currLang.intlMessages}>
            <AppContainer {...rest} />
        </IntlProvider>
    )
}

const mapStateToProps = (state: any) => {
    return {
        stApp: AppActions.get(state)
    }
}
const mapDispatchToProps = {
    changeLang: AppActions.actionChangeLang
}
export default connect(mapStateToProps, mapDispatchToProps)(LangApp);