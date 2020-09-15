import { from, of, Subject } from "rxjs";
import { catchError, debounceTime, map, switchMap } from "rxjs/operators";

import { ISearchResponse, ISearchRequest } from "src/App/helpers/model";



export type SearchPipeResponse<TFilter, TData> = {
    err: boolean;
    resp?: ISearchResponse<TData>;
    req: ISearchRequest<TFilter>;
    axiosErr?: any;
    axiosResp?: TData;
}

export function createStdPipe<TFilter = any, TData = any>(
    $subject: Subject<any>, 
    xhrCall: (model: any) => Promise<any>, 
    debounce: number = 300
) {
    return $subject.pipe(
        debounceTime(debounce),             // wait debounce after each keystroke before considering the term
        switchMap((model: any) => {         // switch to new search observable each time the term changes
            // if (cts) {
            //     cts.cancel('new request dismiss older.');
            // }
            // if (updateCts) {
            //     cts = Axios.CancelToken.source();
            //     updateCts(cts);
            // }
            const promise = xhrCall(model);
            const observer = from(promise);
            return observer.pipe(
                catchError(err => {
                    return of({
                        axiosErr: err,
                        err: true,
                        req: model,
                    } as SearchPipeResponse<TFilter, TData>);
                }),
                map((resp: any) => {
                    return !resp.axiosErr ? {
                        axiosResp: resp,
                        err: false,
                        req: model,
                        resp: resp as ISearchResponse,
                    } as SearchPipeResponse<TFilter, TData> : resp;
                })
            );
        })
    );
}