import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';

import { createBrowserHistory, History } from 'history';

import { reducers } from 'src/App/context';
import { AppActions } from './actions';



/** 
 * We need to replace the store's combined reducer whenever a new reducer is registered (e.g., after loading an on-demand chunk).
 * This is complicated slightly by the need to preserve initial state
 * that may have been created by reducers that aren’t yet loaded on the client.
 * By default, once an action is dispatched, Redux will throw away state that is not
 * tied to a known reducer.
 * To avoid that, reducer stubs are created to preserve the state.
 */
function combine(nextReducers: any, initialState = {}): any {
    const clone = nextReducers;
    const reducerNames = Object.keys(clone);

    Object.keys(initialState).forEach((item) => {
        if (reducerNames.indexOf(item) === -1) {
            clone[item] = (state: any = null) => state;
        }
    });

    return combineReducers(clone);
};

export type StoreConfig = {
    store: Store;
    history: History;
}
/**
 * Create global redux storage for application.
 */
export default function configureStore(initialState = {}): StoreConfig {
    const history = createBrowserHistory();
    const middlewares: any[] = [thunkMiddleware, routerMiddleware(history)];

    let composeEnhancers = compose;
    /* eslint-disable no-underscore-dangle */
    if (process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    }
    /* eslint-enable */
    
    // register router reducers.
    reducers.register({ router: connectRouter(history) });

    const combineReducers = combine(reducers.registry);
    const enhancer = composeEnhancers(applyMiddleware(...middlewares));

    const store = createStore(combineReducers, initialState, enhancer);
    reducers.listener((nextReducers) => {
        const nextCombine = combine(nextReducers, initialState);
        store.replaceReducer(nextCombine);
    });
    window.addEventListener('resize', function() {
        store.dispatch(AppActions.actionScreenResize(this.innerWidth, this.innerHeight))
    });

    return { store, history };
}
