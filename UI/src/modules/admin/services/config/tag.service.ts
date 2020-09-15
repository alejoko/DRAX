import { XhrClient } from "src/App/services/xhr";

import { makeQueryString } from "src/App/helpers/xhr";
import { Guid, IResponse, ISearchRequest, ISearchResponse } from "src/App/helpers/model";

import config from 'src/config';


export interface ITagModel {
    id: Guid;
    name: string;
}
export interface ISearchTagRequest extends ISearchRequest<{ tags?: string[] }> {}
export interface ISearchTagResponse extends IResponse<ISearchResponse<ITagModel>> {}

/**  */
export default abstract class TagService {
    /**
     * 
     * @param client 
     * @param request 
     */
    public static async search(client: XhrClient, request?: ISearchTagRequest) {
        const qs = makeQueryString(request, true, { addQueryPrefix: true });
        const response = await client
            .get<ISearchTagResponse>(`${config.endpoint}/api/v1/admin/Tag${qs}`)
            .then(resp => resp.data);
        return response;
    }
}
