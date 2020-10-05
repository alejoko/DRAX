import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { useIntl } from 'react-intl';

import Home from './Home';
import Search from './Search';
import SetupCompany from '../../SetupCompany/index';
import GenericErrorPage from 'src/App/components/GenericErrorPage';

import { fixUrlEnd } from 'src/App/helpers/string';

export default function ClientModule({ match: { url } }: RouteComponentProps) {
    const intl = useIntl();
    const path = React.useMemo(() => fixUrlEnd(url), [url]);

    return (
        <Switch>
            <Route exact={true} path={`${path}`} component={Home} />
            <Route exact={true} path={`${path}search`} component={Search} />
            <Route exact={true} path={`${path}company-search`} render={(props) => <GenericErrorPage severity="error" message={intl.formatMessage({ id: 'generic-error-page.404.message'})} />} />
            <Route path={`${path}company-search/:companyId`} component={SetupCompany} />
            <Route path={`${path}watch-list`} render={(props) => <GenericErrorPage severity="error" message={intl.formatMessage({ id: 'generic-error-page.404.message'})} />} />
            <Route path={`${path}my-searches`} render={(props) => <GenericErrorPage severity="error" message={intl.formatMessage({ id: 'generic-error-page.404.message'})} />} />
            <Route path={`${path}how-It-works`} render={(props) => <GenericErrorPage severity="error" message={intl.formatMessage({ id: 'generic-error-page.404.message'})} />} />

            <Route render={(props) => <GenericErrorPage severity="error" message={intl.formatMessage({ id: 'generic-error-page.404.message'})} />} />
        </Switch>
    )
};

ClientModule.path = 'client';

ClientModule.routes = {
    home: '',
    search: 'search',
    companySearch: 'company-search',
    watchList: 'watch-list',
    mySearches: 'my-searches',
    howItWorks: 'how-it-works'
};