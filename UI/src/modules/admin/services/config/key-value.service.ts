import { XhrClient } from "src/App/services/xhr";

import { makeQueryString } from "src/App/helpers/xhr";
import { Guid, DateTime, IResponse, ISearchRequest, ISearchResponse } from "src/App/helpers/model";

import config from 'src/config';


export interface IKeyValueModel {
    id: Guid;
    key: string;
    value: string;
    tagID: Guid;
    modified: DateTime;
    contentInfo: string;
}
export interface ISearchKeyValueRequest extends ISearchRequest<{
    key?: string,
    tags?: string[]
}> {}
export interface ISearchKeyValueResponse extends IResponse<ISearchResponse<IKeyValueModel>> {}


interface ICRUKeyValueRequest {
    tagID: Guid;
    value: string;
    contentInfo: string;
}
export interface ICreateKeyValueRequest extends ICRUKeyValueRequest {
    key: string;
}
export interface IUpdateKeyValueRequest extends ICRUKeyValueRequest {
}
/**  */
export default abstract class KeyValueService {
    /**
     * 
     * @param client 
     * @param request 
     */
    public static async search(client: XhrClient, request?: ISearchKeyValueRequest) {
        const qs = makeQueryString(request, true, { addQueryPrefix: true });
        const response = await client
            .get<ISearchKeyValueResponse>(`${config.endpoint}/api/v1/admin/KeyValue${qs}`)
            .then(resp => resp.data);
        return response;
    }
    
    /**
     * 
     * @param client 
     * @param id 
     */
    public static async delete(client: XhrClient, id: Guid) {
        const response = await client
            .delete<ISearchKeyValueResponse>(`${config.endpoint}/api/v1/admin/KeyValue/${id}`)
            .then(resp => resp.data);
        return response;
    }
    /**
     * 
     * @param client 
     * @param id 
     * @param request 
     */
    public static async create(client: XhrClient, request?: ICreateKeyValueRequest) {
        const response = await client
            .post<ISearchKeyValueResponse>(`${config.endpoint}/api/v1/admin/KeyValue`, request)
            .then(resp => resp.data);
        return response;
    }
    /**
     * 
     * @param client 
     * @param id 
     * @param request 
     */
    public static async update(client: XhrClient, id: Guid, request?: IUpdateKeyValueRequest) {
        const response = await client
            .put<ISearchKeyValueResponse>(`${config.endpoint}/api/v1/admin/KeyValue/${id}`, request)
            .then(resp => resp.data);
        return response;
    }
}
