import { Constants } from '../actions/constants';
import tagActions, { TagStore, LoadTagPayload } from '../actions/TagActions';

import { reducers } from 'src/App/context';
import { StdAction, entityReducer } from 'src/App/helpers/redux';


// #region app
// ========================================= App =========================================
function tagReducer(
    state: TagStore | null = null,
    action: StdAction<LoadTagPayload>
): TagStore | null {
    if (action.type === Constants.LOAD_COUNTRY) {
        return entityReducer(state, action, Constants.LOAD_COUNTRY);
    }

    return state;
};
// #endregion

export default function registerReducers() {
    reducers.register({
        [tagActions.store]: tagReducer
    });
}