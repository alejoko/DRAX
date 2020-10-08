import { Constants } from './constants';
import CompanyActions, { SectorsByCompanyStore as SectorsByCompanyStoreX } from './CompanyActions';
import adminRegisterReducers from '../reducers';

adminRegisterReducers();

export {
    Constants,
    CompanyActions,
};
export type SectorsByCompanyStore = SectorsByCompanyStoreX;