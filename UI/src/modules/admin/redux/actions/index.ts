import { Constants } from './constants';

import TagActions, { TagStore as TagStoreX } from './TagActions';

import adminRegisterReducers from '../reducers';


adminRegisterReducers();

export {
    Constants,
    TagActions,
};
export type TagStore = TagStoreX;
