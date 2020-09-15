import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import { NotFound } from 'src/App/components/Pages';

import { fixUrlEnd } from 'src/App/helpers/string';


function AdminModule(props: RouteComponentProps) {
    const { match } = props;

    // #region React Cicle
    // ======================================= React Cicle =======================================
    const path = React.useMemo(() => fixUrlEnd(match.url), [match.url]);
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    return (
        <Switch>
            <Route component={NotFound} />
        </Switch>
    )
    // #endregion
}
AdminModule.path = 'admin';
AdminModule.routes = {
    config: 'config'
}

export default AdminModule;