export type DateTime = string;
export type Guid = string[36];


/** Uniform response model */
export interface IResponse<TBody> {
    body: TBody,
    code: number;
    uiText: string;
    command: any;
    isSuccess: true;
}

/** Uniform search response model */
export interface ISearchResponse<TData = any> {
    total: number;
    data: TData[];
}

export interface IPagging {
    page: number;
    pageSize: number;
}
export interface INameColumn {
    ascendant: boolean;
    name: string;
}
/** Uniform search request model */
export interface ISearchRequest<TFilter = any> {
    pagging?: IPagging;
    order?: INameColumn[];
    include?: string[];
    filter?: TFilter;
}