import { Constants } from '../actions/constants';
import CompanyActions, { CompanyStore, GetCompanyByIdPayload } from '../actions/CompanyActions';

import { reducers } from 'src/App/context';
import { StdAction, entityReducer } from 'src/App/helpers/redux';

function companyReducer(
    state: CompanyStore | null = null,
    action: StdAction<GetCompanyByIdPayload>
): CompanyStore | null {
    if (action.type === Constants.GET_COMPANY_BY_ID) {
        return entityReducer(state, action, Constants.GET_COMPANY_BY_ID);
    }

    return state;
};

export default function registerReducers() {
    reducers.register({
        [CompanyActions.store]: companyReducer
    });
}

