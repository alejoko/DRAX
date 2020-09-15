/**
 * Retrieve nameof type property. 
 * @param name 
 */
export const nameof = <T>(name: keyof T): string => name as string;
/**
 * verified if url ends with /
 * @param url 
 */
export const fixUrlEnd = (url: string) => url.endsWith('/') ? url : `${url}/`;

/**
 * Concat url parts to build a path
 * @param lang 
 * @param byUser 
 * @param args 
 */
export function buildRoute(lang: string, byUser: boolean, ...args: string[]) {
    const url = args.filter(p => !!p).join('/');
    if (byUser) {
        return url ? `/${lang}/${url}` : `/${lang}`;
    }
    return `/${url}`; 
}
/**
 * Split url in logical parts to get seccion and subSection
 * @param pathname 
 * @param home 
 * @param lang 
 */
export function getUrlPart(pathname: string, home: string[], langByUser: boolean) {
    const array = pathname.split('/');
    const aux = array[array.length - 1];

    const section = langByUser ? array[2] : array[1];
    const subSection = (!aux || home.indexOf(aux) !== -1) ? 'home' : aux;

    return [section, subSection]
}