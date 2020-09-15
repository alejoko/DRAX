import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import Home from './Home';
import Search from './Search';
import { NotFound } from 'src/App/components/Pages';

import { fixUrlEnd } from 'src/App/helpers/string';


function ClientModule(props: RouteComponentProps) {
    const { match } = props;

    // #region React Cicle
    // ======================================= React Cicle =======================================
    const path = React.useMemo(() => fixUrlEnd(match.url), [match.url]);
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    return (
        <Switch>
            <Route exact={true} path={`${path}`} component={Home} />
            <Route exact={true} path={`${path}search`} component={Search} />

            <Route component={NotFound} />
        </Switch>
    )
    // #endregion
}
ClientModule.path = 'client';
ClientModule.routes = {
    home: '',
    search: 'search' 
}

export default ClientModule;