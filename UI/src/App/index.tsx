import React, { useEffect, useMemo } from 'react';
import { History } from 'history';
import { Switch, Route } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ConnectedRouter, CallHistoryMethodAction } from 'connected-react-router/immutable';

import LangCustomApp from './LangCustomApp';
import Loader from './components/Loader';

import XhrProvider from './hooks/XhrProvider';
import { useAuthService } from './hooks/AuthProvider';

import { updateAbilitiesFor } from './security/ability';
import { loadingText, defaultLang } from './helpers/language';
import { RouteActions, AppActions } from './redux/actions';

import { XhrService } from './services/xhr';


export type AppProps = {
    history: History;
    lang: string;
    xhrService: XhrService;
    /** Application initialization */
    appInit: () => void;
    goto?: (action: CallHistoryMethodAction) => void;
    showSpin?: (visibility: boolean) => void;
}
function App(props: AppProps) {
    const { history, lang, xhrService, appInit, goto, showSpin } = props;
    const { user, loading } = useAuthService();

    // #region React Cicle
    // ======================================= React Cicle =======================================
    useEffect(() => {
        appInit();
    }, [appInit]);

    useEffect(() => {
        updateAbilitiesFor(user);
    }, [user]);

    // FOR HTTP REQUEST
    useMemo(() => xhrService.update({
        gotoLogin: () => goto!(RouteActions.actionGotoLogin()),
        gotoForbiden: () => goto!(RouteActions.actionGotoForbiden()),
        hideSpin: () => showSpin!(false),
        showSpin: () => showSpin!(true)
    }), [goto, showSpin]);

    const xhrClient = useMemo(() => {
        xhrService.user(user);
        return xhrService.client;
    }, [user?.access_token]);
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    if (loading) {
        const text = !!lang ?
            (loadingText[lang] || loadingText[defaultLang]) : loadingText[defaultLang];

        return (
            <Loader loading={true} text={text} />
        )
    }

    return (
        <XhrProvider client={xhrClient}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/:lang([a-z | A-Z]{2})?" render={(props) => <LangCustomApp {...props} overrideLang={lang} />} />
                </Switch>
            </ConnectedRouter>
        </XhrProvider>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    appInit: () => dispatch(AppActions.actionInit()),
    goto: (action: CallHistoryMethodAction) => dispatch(action),
    showSpin: (visibility: boolean) => dispatch(AppActions.actionShowGlobalSpin(visibility)),
})
export default connect(null, mapDispatchToProps)(App);
