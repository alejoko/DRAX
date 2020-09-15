import React from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';

import { NotFound } from './components/Pages';
import Home from 'src/modules/client/components/Home';
import AdminModule from 'src/modules/admin/components';
import ClientModule from 'src/modules/client/components';

import { fixUrlEnd } from 'src/App/helpers/string';


function AppBody(props: RouteComponentProps) {
    const { match } = props;

    // #region React Cicle
    // ======================================= React Cicle =======================================
    const path = React.useMemo(() => fixUrlEnd(match.url), [match.url]);
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    return (
        <Switch>
            <Route exact={true} path={path} component={Home}/>
            
            <Route path={`${path}${ClientModule.path}`} component={ClientModule} />
            <Route path={`${path}${AdminModule.path}`} component={AdminModule} />

            <Route component={NotFound} />
        </Switch>
    )
    // #endregion
}

export default withRouter(AppBody);