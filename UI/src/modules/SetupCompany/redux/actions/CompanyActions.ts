import { Dispatch } from 'redux';

import { Constants } from './constants';
import { LoaderInfo } from 'src/App/hoc/withDataFromRedux';
import { XhrClient } from 'src/App/services/xhr';

import { nameof } from 'src/App/helpers/string';
import { actionCreator, entitySafeLoad  } from 'src/App/helpers/redux';

import CompanyService, { ICompanyModel } from '../../services/company.service';

type EntityBucket<T = any> = {
    data: T;
    cache: { [key: string]: T };
};

type EntityPayload<T = any> = {
    data: T;
    idKey: string;
}

export type GetCompanyByIdPayload = EntityPayload<ICompanyModel>;
export type CompanyStore = EntityBucket<ICompanyModel>;

const st = 'stCompany';
const getCompanyByIdActionCreator = actionCreator<GetCompanyByIdPayload>(Constants.GET_COMPANY_BY_ID);

abstract class CompanyActions {

    public static get store() {
        return st;
    }

    public static get = (state: any): CompanyStore => state[st];

   public static fetchCompanyById = (client: XhrClient, companyId: string) => async (dispatch: Dispatch, getState: () => any) => {
        const result = await entitySafeLoad<ICompanyModel>(
            dispatch,
            getState,
            st,
            () => CompanyService.getCompanyById(client, companyId).then(resp => resp),
            getCompanyByIdActionCreator,
            nameof<ICompanyModel>('id')
        );
        console.log('resultado action: ', result);
        return result;
    }
}
export default CompanyActions;