import initRegistry from './registry';


export type ReducerEntries = { 
    [key: string]: Function
};

const reducers = initRegistry<ReducerEntries>();
export {
    reducers,
}