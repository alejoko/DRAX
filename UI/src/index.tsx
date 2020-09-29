import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { History } from 'history';

import GenericErrorPage from 'src/App/components/GenericErrorPage';

import App from 'src/App';
import ServiceProvider from 'src/App/hooks/AuthProvider';

import configureStore from 'src/App/redux';
import { loadPolyfill } from 'src/App/helpers/polyfill';
import { getBrowserLang, defaultLang, loadingText, availablesLangs } from 'src/App/helpers/language';

import { XhrService } from './App/services/xhr';
import { IAuthService } from 'src/App/services/auth/_auth.type';
import authFactory from 'src/App/services/auth/auth-password.service';

import config from './config';

import * as serviceWorker from './serviceWorker';

import './index.less';

const root = document.getElementById('root');
/**
 * Early render to indicate user the site is loading. */
ReactDOM.render(loadingText[defaultLang] as any, root);

/** Render Main page */
function render(store: Store, history: History, lang: string, authService: IAuthService, xhrService: XhrService) {
    const app = (
        <Provider store={store}>
            <ServiceProvider service={authService}>
                <App history={history} lang={lang} xhrService={xhrService} />
            </ServiceProvider>
        </Provider>
    )
    ReactDOM.render(app, root);
}

/** Initialized application */
async function init() {
    try {
        const { identity } = config;

        const lang = getBrowserLang();
        const { store, history } = configureStore();

        const autlService = authFactory({
            clientId: identity.password.clientID,
            clientSecret: identity.password.secret,
            prefix: identity.password.prefix,
            scope: identity.password.scope,
            tokenEndPoint: identity.password.tokenEndPoint
        });
        const xhrService = new XhrService();

        render(store, history, lang, autlService, xhrService);
    } catch(error) {
        console.error(error);
        ReactDOM.render(<GenericErrorPage severity="error" message="Sorry, something went wrong." />, root);
    }
}
function predictiveLoader() {
    const lang = getBrowserLang();
    const { intl, moment } = availablesLangs[lang];
    Promise.all([intl(), moment(), init()]);
}
loadPolyfill(predictiveLoader);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();