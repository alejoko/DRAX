import { Dispatch } from 'redux';

import { Constants } from './constants';
import { LoaderInfo } from 'src/App/hoc/withDataFromRedux';
import { XhrClient } from 'src/App/services/xhr';

import { nameof } from 'src/App/helpers/string';
import { actionCreator, EntityPayload, entitySafeLoad, EntityBucket } from 'src/App/helpers/redux';

import TagService, { ITagModel } from '../../services/config/tag.service';


export type LoadTagPayload = EntityPayload<ITagModel>;
export type TagStore = EntityBucket<ITagModel>;

const st = 'stConfigTag';
const loadAction = actionCreator<LoadTagPayload>(Constants.LOAD_COUNTRY);

/**
 * Action globals referent to app.
 */
abstract class TagActions {
    /** Name of the storage */
    public static get store() {
        return st;
    }
    /**
     * Dispatch autoLoad tag action
     * @param payload 
     */
    public static get autoLoader(): LoaderInfo<ITagModel> {
        return {
            get: this.get,
            loader: this.actionLoad,
            store: this.store
        } as LoaderInfo<ITagModel>
    }

    /**
     * Get store value associate to tags
     * @param state 
     */
    public static get = (state: any): TagStore => state[st];
    /**
     * Load endpoint data in to redux.
     * @param client Client used to request.
     */
    public static actionLoad = (client: XhrClient) => async (dispatch: Dispatch, getState: () => any) => {
        const result = await entitySafeLoad<ITagModel>(
            dispatch,
            getState,
            st,
            () => TagService.search(client).then(resp => resp.body.data),
            loadAction,
            nameof<ITagModel>('id')
        );
        return result;
    }
}
export default TagActions;