import { XhrClient } from "src/App/services/xhr";
import { IResponse, ISearchResponse } from "src/App/helpers/model";

import config from 'src/config';
import { companyConverter, sectorConverter, productConverter } from './converters';

export interface ICompanyModel {
    id: string;
    companyName: string;
    companyDescription: string;
    companyIcon: string;
    domain: string;
    mainOffice: string;
    employees: number;
};

export interface ISectorModel {
    key: string;
    value: string;
};

export interface IProductModel {
    key: string;
    value: string;
};

export interface ICompanyResponse extends IResponse<ISearchResponse<ICompanyModel>> {}
export interface ISectorResponse extends IResponse<ISearchResponse<ISectorModel>> {};
export interface IProductResponse extends IResponse<ISearchResponse<IProductModel>> {};

export default abstract class CompanyService {

    public static async getCompanyById(client: XhrClient, companyId: string) {
        const response = await client
            .get<ICompanyModel>(`${config.endpoint}fastapi/company/${companyId}`)
            .then(resp => companyConverter(resp.data));
        return response;
    }

    //TODO: usar mas adelante
    /*public static async getSectors(client: XhrClient) {
        //TODO: its necessary company id?
        const response = await client
            .get<ISectorModel>(`${config.endpoint}/fastapi/company/sector`)
            .then(resp => sectorConverter(resp.data));
        return response;
    }

    public static async getProducts(client: XhrClient) {
        //TODO: its necessary company id?
        const response = await client
            .get<IProductResponse>(`${config.endpoint}/fastapi/company/product`)
            .then(resp => productConverter(resp.data));
        return response;
    }

    //TODO: review that
    public static async searchCompanies(client: XhrClient, queryString: string) {
        const response = await client
            .get<ICompanyResponse>(`${config.endpoint}/fastapi/company${queryString}`)
            .then(resp => companyConverter(resp.data));
        return response;
    }*/
};