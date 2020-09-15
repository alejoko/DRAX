import React, { PropsWithChildren, createContext, useContext } from 'react';
import { XhrClient } from 'src/App/services/xhr';


type ContextType = XhrClient | undefined;
const XhrContext = createContext<ContextType>(undefined);

export type XhrProviderProps = PropsWithChildren<{
    client?: XhrClient;
}>;
/**
 * Register autentication service.
 * @param props 
 */
function XhrProvider(props: XhrProviderProps) {
    const { children, client } = props;

    // #region Render
    // ========================================== Render =========================================
    return (
        <XhrContext.Provider value={client}>
            {children}
        </XhrContext.Provider>
    );
    // #endregion
}


export function useXhrClient() {
    return useContext<any>(XhrContext) as XhrClient;
}

export default XhrProvider;