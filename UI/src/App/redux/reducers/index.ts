import { Constants } from '../actions/constants';
import AppActions, { AppStore, AppInitPayload, ChangeLangPayload, ScreenResizePayload, ShowGlobalSpinPayload } from '../actions/AppActions';
import DrawerActions, { DrawerStore, DrawerChangePayload } from '../actions/DrawerActions';

import { reducers } from 'src/App/context';
import { StdAction } from 'src/App/helpers/redux';

import { defaultLang } from 'src/App/helpers/language';


// #region app
// ========================================= App =========================================
function appReducer(
    state: AppStore = {
        init: false,
        lang: {
            code: defaultLang,
            byUser: false
        },
        screen: typeof window === 'object' ? {
            width: window.innerWidth,
            height: window.innerHeight
        } : undefined,
        globalSpin: {
            visible: false
        }
    },
    action: StdAction<AppInitPayload | ChangeLangPayload | ScreenResizePayload | ShowGlobalSpinPayload>
): AppStore {
    switch (action.type) {
        case Constants.APP_INIT:
            {
                const payload = action.payload as AppInitPayload;
                return {
                    ...state,
                    init: payload
                };
            }
        case Constants.LANG_UPDATE:
            {
                const payload = action.payload as ChangeLangPayload;
                return {
                    ...state,
                    lang: payload
                }
            }
        case Constants.SCREEN_RESIZE:
            {
                const payload = action.payload as ScreenResizePayload;
                return {
                    ...state,
                    screen: payload
                }
            }
        case Constants.SHOW_GLOBAL_SPIN:
            {
                const payload = action.payload as ShowGlobalSpinPayload;
                return {
                    ...state,
                    globalSpin: payload
                }
            }
    }
    return state;
};
function drawerReducer(
    state: DrawerStore = {
        children: undefined,
        drawerProps: { visible: false, destroyOnClose: true }
    },
    action: StdAction<DrawerChangePayload>
): DrawerStore {
    switch (action.type) {
        case Constants.DRAWER_CHANGE:
            const { children, drawerProps } = action.payload;
            return {
                children,
                drawerProps: {
                    ...drawerProps,
                    destroyOnClose: true
                },
            }
    }
    return state;
}
// #endregion

export default function registerReducers() {
    reducers.register({
        [AppActions.store]: appReducer,
        [DrawerActions.store]: drawerReducer
    });
}