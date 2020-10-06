import { Action, Dispatch } from "redux";


// ==================================================================================

export type StdAction<T> = Action<string> & {
    payload: T;
}
/**
 * Allow create action
 * @param type 
 */
export function actionCreator<T = any>(type: string) {
    return function (payload: T): StdAction<T> {
        return { 
            type: type, 
            payload: payload
        };
    };
};

// ==================================================================================

/** Store entity and fast access cache */
export type EntityBucket<T = any> = {
    data: T[];
    cache: { [key: string]: T };
};
/** */
export type EntityPayload<T = any> = {
    data: T[];
    idKey: string;
}

// ==================================================================================

/**
 * Convert all entity in a dictionary with id as a key. 
 * @param {any[]} data 
 */
export function buildEntityCache(data: any[], idKey: string) {
    const cache: any = { };
    if (!(data instanceof Array)) {
        data = [data];
    }
    data.forEach(v => cache[v[idKey]] = v);

    return cache;
}
/**
 * Common behaivor for every enumerator entity
 * @param state 
 * @param action 
 * @param type 
 */
export function entityReducer(state: any, action: StdAction<EntityPayload>, type: string): EntityBucket {
    if (action.type === type) {
        const data = Array.isArray(action.payload.data) ? action.payload.data : [action.payload.data];
        return {
            cache: buildEntityCache(data, action.payload.idKey),
            data: action.payload.data
        }
    }
    return state;
}

// ==================================================================================

const requested: { [key: string]: boolean } = { };
/**
 * 
 * @param dispatch 
 * @param store 
 * @param loader 
 * @param action 
 * @param idKey 
 */
export async function entitySafeLoad<T = any>(
    dispatch: Dispatch, 
    getState: () => any,
    store: string, 
    loader: () => Promise<T[]>, 
    actionFactory: (payload: EntityPayload<T>) => StdAction<EntityPayload<T>>, 
    idKey: string = 'id',
    isAlreadyLoad: (state: any, store: string) => boolean = (state, store) => state[store],
    isRequestPending: (reqPending: any, store: string) => boolean = (reqPending, store) => reqPending[store],
    updateRequestPending: (reqPending: any, store: string, value: boolean) => void = (reqPending, store, value) => reqPending[store] = value
) {
    const state = getState();
    if (!isAlreadyLoad(state, store)) {
        if (!isRequestPending(requested, store)) {
            updateRequestPending(requested, store, true);
            
            try {
                const data = await loader();
                const action = actionFactory({ data, idKey });
                dispatch(action);
                return data;
            } catch (err) {
                console.error(err);
                updateRequestPending(requested, store, false);
            };
        }
    }
    return state[store] && state[store].data;
}
// ==================================================================================