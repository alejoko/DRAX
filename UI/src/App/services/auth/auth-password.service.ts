import jwtDecode from 'jwt-decode';
import { AuthPasswordSettings, AuthResultStatus, AuthResult, UserInfo, IAuthService } from './_auth.type';



type CallbackType = {
    subscription: number;
    callback: (user?: UserInfo) => void;
}
export type AuthPasswordLoginArgs = {
    username: string;
    password: string;
    rememberMe: boolean;
}

class AuthPasswordClient<T = any> implements IAuthService<T>
{
    private _name: string;
    private _callbacks: CallbackType[] = [];
    private _nextSubscriptionId: number = 0;
    private _user?: UserInfo<T>;
    private _settings: AuthPasswordSettings;

    /**
     * 
     * @param settings 
     */
    public constructor(settings: AuthPasswordSettings) {
        this._settings = settings;
        this._name = `${settings.prefix}:${settings.tokenEndPoint}:${settings.prefix}`;

        this._loadFromLocalStore();
    }
    public accessToken(): string | undefined {
        return this._user?.access_token;
    }
    
    /** Get user information. */
    public getUser(): UserInfo<T> | undefined {
        if (this.authenticated()) {
            return this._user;
        }
        return undefined;
    } 
    /** Get if user is authenticate. */
    public authenticated() {
        if (!this._user || this._isTokenExpired(this._user.profile.auth_time, this._user.expires_in)) {
            return false;
        }
        return true;
    }

    /**
     * Subscribe event to update when user change.
     * @param callback 
     */
    public subscribe(callback: (user?: UserInfo<T>) => void) {
        this._callbacks.push({ callback, subscription: this._nextSubscriptionId });
        return this._nextSubscriptionId++;
    }
    /**
     * Unsubscribe event for user loging.
     * @param subscriptionId 
     */
    public unsubscribe(subscriptionId: number) {
        const index = this._callbacks.findIndex(p => p.subscription === subscriptionId);
        if (index === -1) {
            throw new Error(`Found an invalid number of subscriptions for: ${subscriptionId}`);
        }
        this._callbacks.splice(index, 1);
    }

    /**
     * Try to login using specified credentials
     * @param args username, password and rememberMe 
     */
    public async login(args: AuthPasswordLoginArgs): Promise<AuthResult<T>> {
        const { clientId, clientSecret, scope, tokenEndPoint } = this._settings;

        const body = [
            { key: 'username', value: args.username },
            { key: 'password', value: args.password },
            { key: 'grant_type', value: 'password' },
            { key: 'client_id', value: clientId },
            { key: 'client_secret', value: clientSecret },
            { key: 'scope', value: scope }
        ].map(m => `${m.key}=${encodeURIComponent(m.value)}`).join('&');

        const xhr = await fetch(tokenEndPoint, {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
            mode: "cors"
        });
        const response = await xhr.json();

        if (xhr.ok) {
            return {
                user: this._updateState(response),
                status: AuthResultStatus.Success,
            };
        }

        return {
            error: response,
            status: AuthResultStatus.Fail,
        };
    }
    /**
     * Invalidate curr token and remove data from localStorage
     */
    public logout() {
        this._updateState();
    }

    // #region Private
    // ========================================= Private =========================================
    /** Notify all subcriber user change */
    private _notifySubscribers(user?: UserInfo) {
        for (const entry of this._callbacks) {
            const { callback } = entry;
            if (callback) {
                callback(user);
            }
        }
    }
    /**
     * Check if token is expired.
     * @param authTime 
     * @param expireIn 
     */
    private _isTokenExpired(authTime: number, expireIn: number) {
        const now = new Date();
        const time = new Date(1000 * (authTime + expireIn));

        const expired = now >= time
        if (expired) { 
            this.logout();
        }
        return expired;
    }
    /**
     * Try to load user data from information store in localStore
     * @param username 
     * @returns true if can load, else false
     */
    private _loadFromLocalStore() {
        if (this._user) {
            if (this._isTokenExpired(this._user.profile.auth_time, this._user.expires_in)) {
                return false;
            }
            return true;
        }
        
        const store = localStorage.getItem(this._name);
        if (!store) {
            return false;
        }
        const data: UserInfo = JSON.parse(store);
        if (this._isTokenExpired(data.profile.auth_time, data.expires_in) || !data) {
            return false;
        }
        this._user = data;
    }
    private _updateState(data?: any, updateLocalStorage = true): UserInfo<T> | undefined {
        if (data) {
            const { access_token, expires_in, token_type, scope } = data;
            const profile: any = jwtDecode(access_token);

            const { sub, auth_time, email, email_verified, firstName, lastName, role, avatar, ...others } = profile;
            this._user = {
                expires_in,
                profile: {
                    sub,
                    auth_time,
                    email,
                    emailVerified: email_verified,
                    firstName,
                    lastName,
                    roles: role.split(',').map((m: string) => m.trim()),
                    avatar,
                    others
                },
                scope,
                token_type,
                access_token,
                // id_token: undefined,
                // session_state: undefined
            };
            if (updateLocalStorage) {
                localStorage.setItem(this._name, JSON.stringify(this._user));
            }
        } else {
            this._user = undefined;
            if (updateLocalStorage) {
                localStorage.removeItem(this._name);
            }
        }
        this._notifySubscribers(this._user);
        return this._user;
    }
    // #endregion
}

export default (args: AuthPasswordSettings) => new AuthPasswordClient(args);