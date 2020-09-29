import qs, { IStringifyOptions } from 'qs';

const recursiveClean = (data: any, skipVersion: boolean) => {
    if (Array.isArray(data)) {
        return data;
    }
    const aux = { ...data };
    for (const key of Object.keys(aux)) {
        if (aux[key] === '' || aux[key] === null || aux[key] === undefined || (skipVersion && key === '_version')) {
            delete aux[key];
        } else if (typeof aux[key] === 'object') {
            aux[key] = recursiveClean(aux[key], skipVersion);
        }
    }
    return aux;
};

const makeQueryString = (data: any, cleanEmptyString?: boolean, options?: IStringifyOptions, skipVersion: boolean = true) => {
    if (cleanEmptyString) {
        data = recursiveClean(data, skipVersion);
    }
    return qs.stringify(data, { allowDots: true, ...options });
};

export {
    makeQueryString
}