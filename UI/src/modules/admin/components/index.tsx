import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { useIntl } from 'react-intl';

import GenericErrorPage from 'src/App/components/GenericErrorPage';

import { fixUrlEnd } from 'src/App/helpers/string';

export default function AdminModule({ match: { url } }: RouteComponentProps) {
    const intl = useIntl();
    const path = React.useMemo(() => fixUrlEnd(url), [url]);
    return (
        <Switch>
            <Route render={(props) => <GenericErrorPage severity="error" message={intl.formatMessage({ id: 'generic-error-page.404.message'})} />} />
        </Switch>
    )
}
AdminModule.path = 'admin';

AdminModule.routes = {
    config: 'config'
};