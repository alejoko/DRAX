// import { Dispatch } from 'redux';
//
// import { Constants } from './constants';
// import { LoaderInfo } from 'src/App/hoc/withDataFromRedux';
// import { XhrClient } from 'src/App/services/xhr';
//
// import { nameof } from 'src/App/helpers/string';
// import { actionCreator, EntityPayload, entitySafeLoad, EntityBucket  } from 'src/App/helpers/redux';
//
// import CompanyService, { ICompanyModel, ISectorModel } from '../../services/company.service';
//
// export type GetCompanyByIdPayload = EntityPayload<ICompanyModel>;
// export type CompanyStore = EntityBucket<ICompanyModel>;
//
// const st = 'stCompany';
// const getCompanyByIdActionCreator = actionCreator<GetCompanyByIdPayload>(Constants.GET_COMPANY_BY_ID);
// const getCompanyByIdActionCreator = actionCreator<GetCompanyByIdPayload>(Constants.GET_COMPANY_BY_ID);
//
// abstract class CompanyActions {
//
//     public static get store() {
//         return st;
//     }
//
//     public static get = (state: any): CompanyStore => state[st];
//
//    public static fetchCompanyById = (client: XhrClient, companyId: string) => async (dispatch: Dispatch, getState: () => any) => {
//         /*const result = await entitySafeLoad<ICompanyModel>(
//             dispatch,
//             getState,
//             st,
//             () => CompanyService.getCompanyById(client, companyId).then(resp => resp),
//             getCompanyByIdActionCreator,
//             nameof<ICompanyModel>('companyId')
//         );
//         console.log('resultado action: ', result);
//         return result;*/
//         return null;
//     }
//
//     public static fetchCompanyById = (client: XhrClient, companyId: string) => async (dispatch: Dispatch, getState: () => any) => {
//         const result = await entitySafeLoad<ISectorModel>(
//          dispatch,
//          getState,
//          st,
//          () => CompanyService.getSectorsByCompany(client, companyId).then(resp => resp),
//          getCompanyByIdActionCreator,
//          nameof<ISectorModel>('key')
//          );
//          console.log('resultado action: ', result);
//          return result;
//     }
// }
// export default CompanyActions;
import EntityActionBuilder from './EntityActionBuilder';
import { XhrClient } from 'src/App/services/xhr';
import { actionCreator, EntityPayload, EntityBucket } from 'src/App/helpers/redux';
import { Constants } from './constants';
import CompanyService, { ICompanyModel, ISectorModel, IProductModel } from '../../services/company.service';

export type CompanyStore = EntityBucket<ICompanyModel>;
export type GetCompanyByIdPayload = EntityPayload<ICompanyModel>;
/* const getCompanyByIdActionType = actionCreator<GetCompanyByIdPayload>(Constants.GET_COMPANY_BY_ID);*/

export type SectorsByCompanyStore = EntityBucket<ISectorModel>;
export type GetSectorsByCompanyPayload = EntityPayload<ISectorModel>;
const getSectorsByCompanyActionType = actionCreator<GetSectorsByCompanyPayload>(Constants.GET_SECTORS_BY_COMPANY);

/*export type ProductsByCompanyStore = EntityBucket<IProductModel>;
 export type GetProductsByCompanyPayload = EntityPayload<IProductModel>;
 const getProductsByCompanyActionType = actionCreator<GetProductsByCompanyPayload>(Constants.GET_PRODUCTS_BY_COMPANY); */

export default EntityActionBuilder({
    storeNS: 'stSectorsByCompany',
    service: (client: XhrClient, id: string) => CompanyService.getSectorsByCompany(client, id),
    actionType: getSectorsByCompanyActionType
});