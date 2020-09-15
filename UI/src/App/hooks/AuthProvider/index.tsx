import React, { PropsWithChildren, useState, useEffect, createContext, useContext } from 'react';
import { UserInfo, IAuthService } from '../../services/auth/_auth.type';


type ContextType = IAuthService | undefined;
const AuthContext = createContext<ContextType>(undefined);

export type AuthProviderProps = PropsWithChildren<{
    service?: IAuthService;
}>;
/**
 * Register autentication service.
 * @param props 
 */
function AuthProvider(props: AuthProviderProps) {
    const { children, service } = props;

    // #region Render
    // ========================================== Render =========================================
    return (
        <AuthContext.Provider value={service}>
            {children}
        </AuthContext.Provider>
    );
    // #endregion
}


export function useAuthService<T = any>() {
    const [user, setUser] = useState<UserInfo<T>>();
    const [loading, setLoading] = useState<boolean>(true);

    const service: IAuthService<T> = useContext<any>(AuthContext);

    // #region React Cicle
    // ======================================= React Cicle =======================================
    useEffect(() => {
        if (service) {
            setUser(service.getUser());
            const id = service.subscribe(usr => setUser(usr));
            setLoading(false);
            
            return () => {
                service.unsubscribe(id);
            }
        }
    }, [service]);
    // #endregion

    return { user, loading, service }
}

export default AuthProvider;