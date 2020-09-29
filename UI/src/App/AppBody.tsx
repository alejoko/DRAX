import React from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { useIntl } from 'react-intl';

import GenericErrorPage from './components/GenericErrorPage';
import Home from 'src/modules/client/components/Home';
import ClientModule from 'src/modules/client/components';

import { fixUrlEnd } from 'src/App/helpers/string';

function AppBody(props: RouteComponentProps) {
    const { match } = props;
    const intl = useIntl();
    const path = React.useMemo(() => fixUrlEnd(match.url), [match.url]);

    return (
        <Switch>
            <Route exact={true} path={path} component={Home}/>
            <Route path={`${path}${ClientModule.path}`} component={ClientModule} />
            <Route render={(props) => <GenericErrorPage severity="error" message={intl.formatMessage({ id: 'generic-error-page.default.message'})} />} />
        </Switch>
    )
};

export default withRouter(AppBody);