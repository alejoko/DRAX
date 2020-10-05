import { Constants } from './constants';
import CompanyActions, { CompanyStore as CompanyStoreX } from './CompanyActions';
import adminRegisterReducers from '../reducers';

adminRegisterReducers();

export {
    Constants,
    CompanyActions,
};
export type CompanyStore = CompanyStoreX;