import { Constants } from '../actions/constants';
import CompanyActions, { CompanyStore, SectorsByCompanyStore, GetCompanyByIdPayload, GetSectorsByCompanyPayload } from '../actions/CompanyActions';

import { reducers } from 'src/App/context';
import { StdAction, entityReducer } from 'src/App/helpers/redux';

/*function companyReducer(
    state: CompanyStore | null = null,
    action: StdAction<GetCompanyByIdPayload>
): CompanyStore | null {
    if (action.type === Constants.GET_COMPANY_BY_ID) {
        return entityReducer(state, action, Constants.GET_COMPANY_BY_ID);
    }

    return state;
}; */

function sectorsByCompanyReducer(
    state: SectorsByCompanyStore | null = null,
    action: StdAction<GetSectorsByCompanyPayload>
): SectorsByCompanyStore | null {
    if (action.type === Constants.GET_SECTORS_BY_COMPANY) {
        return entityReducer(state, action, Constants.GET_SECTORS_BY_COMPANY);
    }

    return state;
};


// TODO: change be CompanyActions.store
export default function registerReducers() {
    reducers.register({
        //[CompanyActions.store]: sectorsByCompanyReducer
        ['stSectorsByCompany']: sectorsByCompanyReducer
    });
}

