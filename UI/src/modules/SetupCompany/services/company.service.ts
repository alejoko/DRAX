import { XhrClient } from "src/App/services/xhr";
import { IResponse } from "src/App/helpers/model";

import config from 'src/config';
import converterCompanyData from './converters';

export interface ICompanyModel {
    id: string;
    companyName: string;
    companyDescription: string;
    companyIcon: string;
    domain: string;
    mainOffice: string;
    employees: number;
};

export interface ICompanyResponse extends IResponse<ICompanyModel> {};

export default abstract class CompanyService {

    public static async getCompanyById(client: XhrClient, companyId: string) {
        const response = await client
            .get<ICompanyModel>(`${config.endpoint}fastapi/company/${companyId}`)
            .then(resp => converterCompanyData(resp.data));

        console.log('response in service: ', response);
        return response;
    }
};