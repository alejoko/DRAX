
export enum Roles {

}
export type UserInfo<T = any> = {
    id_token?: string;
    expires_in: number;
    scope: string;
    session_state?: string;
    token_type: string;
    access_token?: string;
    profile: { 
        sub: string;
        auth_time: number;
        email: string;
        emailVerified: boolean;
        firstName: string;
        lastName: string;
        avatar?: string;
        roles: string[];
        others: T;
    };
}
export type TokenErrorResponse = {
    error: string;
    error_description: string;
}


export enum AuthResultStatus {
    Redirect = 1,
    Success = 2,
    Fail = 3
};
/** Indicate the result of any auth operation */
export type AuthResult<T = any> = {
    status: AuthResultStatus;
    error?: TokenErrorResponse;
    user?: UserInfo<T>;
}

export type AuthPasswordSettings = {
    /** prefix used to build localStore name */
    prefix: string;
    scope: string;
    /** Url to get token */
    tokenEndPoint: string;
    clientId: string;
    clientSecret: string;
} 
export type AuthCodeSettings = {
    /** prefix used to build localStore name */
    prefix: string;
    scope: string;
    /** Url to get token */
    clientId: string;
    clientSecret: string;
} 
export type AuthSetting = AuthPasswordSettings | AuthCodeSettings


export interface IUserInfoRetrieve<T = any> {
    accessToken(): string | undefined;
    authenticated(): boolean;
    getUser(): UserInfo<T> | undefined;
}
export interface ISubcription<T = any> {
    subscribe(callback: (user?: UserInfo<T>) => void): number;
    unsubscribe(subscriptionId: number): void;
}
export interface IAuthService<T = any> extends ISubcription<T>, IUserInfoRetrieve<T> {
    logout(): void;
    login(args?: any): Promise<AuthResult<T>>;
}