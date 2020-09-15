import React, { Fragment } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import AppHeader from './components/AppHeader';
import AppSider from './components/AppSider';
import AppBody from './AppBody';
import AppBreadcrumb from './AppBreadcrumb';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import { ReduxDrawer } from './components/ReduxDrawer';
import { NotFound, Forbiden, Error as ErrorPage } from './components/Pages';

import { AppActions } from './redux/actions';

import { fixUrlEnd } from 'src/App/helpers/string';


const { Content, Footer } = Layout;

export type AppContainerProps = RouteComponentProps & {
    loading?: boolean;
    loadingText?: string;
}
function AppContainer(props: AppContainerProps) {
    const { match, loading, loadingText } = props;

    // #region React Cicle
    // ======================================= React Cicle =======================================
    const path = React.useMemo(() => fixUrlEnd(match.url), [match.url]);
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    return (
        <Fragment>
            <Loader loading={loading!} text={loadingText} />
            <ReduxDrawer />
            <Switch>
                <Route exact={true} path={`${path}${ErrorPage.path}`} component={ErrorPage} />
                <Route exact={true} path={`${path}${Forbiden.path}`} component={Forbiden} />
                <Route exact={true} path={`${path}${NotFound.path}`} component={NotFound} />

                <Route render={() => (
                    <ScrollToTop>
                        <Layout className="body">
                            <AppHeader />
                            <Layout>
                                <AppSider />
                                <Layout className="content">
                                    <AppBreadcrumb />
                                    <Content className="main-content">
                                        <AppBody />
                                    </Content>
                                    <Footer className="footer">pendiente...</Footer>
                                </Layout>
                            </Layout>
                        </Layout>
                    </ScrollToTop>
                )} />
            </Switch>
        </Fragment>
    )
    // #endregion
}

function mapStateToProps(state: any) {
    const { visible, tip } = AppActions.get(state).globalSpin;
    return {
        loading: visible,
        loadingText: tip
    }
}
export default connect(mapStateToProps)(AppContainer);