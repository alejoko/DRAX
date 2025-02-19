import React, { Fragment } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Box';
import AppHeader from './components/AppHeader';
import AppSider from './components/AppSider';
import AppBody from './AppBody';
import Loader from './components/Loader';
import { ReduxDrawer } from './components/ReduxDrawer';

import GenericErrorPage, { genericErrorPageConfig as errorConfig } from './components/GenericErrorPage';

import { AppActions } from './redux/actions';

import { fixUrlEnd } from 'src/App/helpers/string';

export type AppContainerProps = RouteComponentProps & {
    loading?: boolean;
    loadingText?: string;
}
function AppContainer({ match, loading, loadingText }: AppContainerProps) {
    const intl = useIntl();
    const path = React.useMemo(() => fixUrlEnd(match.url), [match.url]);

    return (
        <Fragment>
            <CssBaseline >
                <Loader loading={loading!} text={loadingText} />
                <ReduxDrawer />
                <Switch>
                    <Route exact={true} path={`${path}${errorConfig.internalServerErrorPath}`} render={(props) => <GenericErrorPage severity="error" message={intl.formatMessage({ id: 'generic-error-page.500.message'})} />} />
                    <Route exact={true} path={`${path}${errorConfig.forbiddenPath}`} render={(props) => <GenericErrorPage severity="error" message={intl.formatMessage({ id: 'generic-error-page.403.message'})} />} />
                    <Route exact={true} path={`${path}${errorConfig.notFoundPath}`} render={(props) => <GenericErrorPage severity="error" message={intl.formatMessage({ id: 'generic-error-page.404.message'})} />} />

                    <Route render={() => (
                        <Fragment>
                            <AppHeader />
                            <AppSider />
                            <Container p={15}>
                                <AppBody />
                            </Container>
                        </Fragment>
                    )} />
                </Switch>
            </CssBaseline>
        </Fragment>
    )
}

function mapStateToProps(state: any) {
    const { visible, tip } = AppActions.get(state).globalSpin;
    return {
        loading: visible,
        loadingText: tip
    }
}
export default connect(mapStateToProps)(AppContainer);