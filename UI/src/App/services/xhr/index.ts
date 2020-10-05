import Axios, { AxiosRequestConfig } from 'axios';
import { UserInfo } from '../auth/_auth.type';

export type XhrResponse<T = any> = {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}

export type XhrError<T = any> = {
    config: any;
    code?: string;
    request?: any;
    response?: XhrResponse<T>;
    isAxiosError: boolean;
    toJSON: () => object;
}

export type RequestConfig = {
    params: any
}

export class XhrClient {
    private _service: XhrService;

    /**
     * 
     * @param config 
     */
    public constructor(service: XhrService) {
        this._service = service;
    }

    /**
     * Perform GET request
     * @param url
     */
    public get<T = any>(url: string, config?: RequestConfig): Promise<XhrResponse<T>> {
        return Axios.get(url, config);
    }

    /**
     * Perform GET request
     * @param url
     * @param useQueryKey
     */
    //
    /*public get<T = any>(url: string, useQueryKey : string, config?: RequestConfig): IResponse<T> {
        const { status, data, error, isLoading } = useQuery(useQueryKey, async () => {
            const { data } = await Axios.get(url, config);
            return data;
        });

        !data || isLoading ? this._service.config.showSpin() : this._service.config.hideSpin();

        console.log('data retornada: ', data);
        return data;
    }*/
    /**
     * Perform POST operation
     * @param url 
     * @param data 
     */
    public async post<T = any>(url: string, data: any): Promise<XhrResponse<T>> {
        this._service.config.showSpin();
        const resp = await Axios.post(url, data);
        this._service.config.hideSpin();

        return resp;
    }
    /**
     * Perform PUT operation
     * @param url 
     * @param data 
     */
    public async put<T = any>(url: string, data: any, config?: RequestConfig): Promise<XhrResponse<T>> {
        this._service.config.showSpin();
        const resp = await Axios.put(url, data, config);
        this._service.config.hideSpin();

        return resp;;
    }
    
    /**
     * Perform DELETE operation
     * @param url 
     * @param data 
     */
    public async delete<T = any>(url: string): Promise<XhrResponse<T>> {
        this._service.config.showSpin();
        const resp = await Axios.delete(url);
        this._service.config.hideSpin();

        return resp;;
    }
}
export type XhrServiceSettings = {
    gotoLogin: () => void;
    gotoForbiden: () => void;
    showSpin: () => void;
    hideSpin: () => void;
}
/**
 * Create Xhr Service to performs http request.
 */
export class XhrService {
    private _user?: UserInfo;
    private _client?: XhrClient;
    private _config?: XhrServiceSettings; 

    /**
     * Initialize XhrService
     * @param config Configuration arguments
     */
    public constructor() {
        // Axios.interceptors.request.use(this._requestInterceptor);
        // Axios.interceptors.response.use(response => response, this._responseErrorInterceptor);
    }

    /** Get configuration */
    public get config(): XhrServiceSettings {
        return this._config!;
    }
    /** Get associate client. */
    public get client(): XhrClient {
        if (!this._config) {
            throw new Error('update config first.');
        }

        if (!this._client) {
            this._client = new XhrClient(this);
        }
        return this._client;
    }

    /** Update user */
    public user(user?: UserInfo) {
        this._user = user;
    }
    /** Update configuration */
    public update(config: XhrServiceSettings) {
        this._config = config;
        return this;
    }

    // #region Private
    // ========================================= Private =========================================
    private _requestInterceptor = (cfg: AxiosRequestConfig) => {
        debugger;
        if (this._user?.access_token) {
            if (!cfg.headers.common['Content-Type']) {
                cfg.headers.common['Content-Type'] = 'application/json';
            }
            // if (detectBrowser().browser === Browser.IE) {
            //     cfg.headers.common['Cache-control'] = 'no-cache';
            //     cfg.headers.common.Pragma = 'no-cache';
            //     cfg.headers.common.Expires = 0;
            // }
            if (!cfg.headers.common.Authorization) {
                cfg.headers.common.Authorization = `Bearer ${this._user.access_token}`;
            }
        }

        return cfg;
    }
    private _responseErrorInterceptor = (error: any) => {
        debugger;
        const { response } = error;

        if (response) {
            switch (response.status) {
                case 401:
                    this._config && this._config.gotoLogin();
                    break;
                case 403:
                    this._config && this._config.gotoForbiden();
                    break;
                case 404: // 404 are used intentionally in commandHandlers when a resource don't exist
                    break;
                default:
                    // const text = error.response && error.response.message ? error.response.message : 'Error! Something went wrong.';
                    // NotificationService.show({ text }, NotificationMsgType.Error);
                    break;
            }
        } else if (error.hasOwnProperty('response')) {
            // let service;
            // let serviceId: string | undefined;

            // if (config.humanReaderMapping) {
            //     for (const key in config.site) {
            //         if (error.config.url.startsWith(config.site[key])) {
            //             service = config.humanReaderMapping[key];
            //             serviceId = key;
            //             break;
            //         }
            //     }
            // }
            // NotificationService.show({ text: `Service Unavailable: ${service || error.config.url}` }, NotificationMsgType.Error, serviceId);
        }

        return Promise.reject(error);
    }
    // #endregion
}