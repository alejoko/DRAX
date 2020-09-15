import React, { useState, createRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { Layout, Menu, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';

import AdminModule from 'src/modules/admin/components';
import ClientModule from 'src/modules/client/components';
import LoginPasswordForm, { LoginPasswordValue } from 'src/modules/account/components/LoginPasswordForm';

import { useAuthService } from '../../hooks/AuthProvider';
import { buildRoute, getUrlPart } from 'src/App/helpers/string';

import { AppActions } from 'src/App/redux/actions';
import { ChangeLangPayload } from 'src/App/redux/actions/AppActions';

import styles from './app-header.module.less';


const { Item } = Menu;
const { Header } = Layout;



export type AppHeaderProps = RouteComponentProps<{ lang: string }> & {
    lang?: ChangeLangPayload;
}
function AppHeader(props: AppHeaderProps) {
    const { lang, match, location } = props;
    const [visible, setVisible] = useState(false);  // only for modal

    const intl = useIntl();
    const { service } = useAuthService();
    const formRef = createRef<FormInstance>();

    
    // #region Private
    // ========================================= Private =========================================
    function getAuthMenuItems() {
        return (
            [(
                <Item key="client">
                    <Link to={buildRoute(lang?.code!, lang?.byUser!, ClientModule.path, ClientModule.routes.home)}>
                        {intl.formatMessage({ id: 'main-menu.client' })}
                    </Link>
                </Item>
            ), (
                <Item key="admin">
                    <Link to={buildRoute(lang?.code!, lang?.byUser!, AdminModule.path, AdminModule.routes.config)}>
                        {intl.formatMessage({ id: 'main-menu.admin' })}
                    </Link>
                </Item>
            ), (
                <Item key="logout" onClick={logoutPasswordHandler}>
                    {intl.formatMessage({ id: 'main-menu.logout' })}
                </Item>
            )]
        )
    }
    function getAnonMenuItems() {
        return (
            <Item key="login" onClick={loginPasswordHandler}>
                {intl.formatMessage({ id: 'main-menu.login' })}
            </Item>
        )
    }
    // #endregion

    // #region Events
    // ========================================== Events =========================================
    // async function onLoginCode() {
    //     const authArgs = {};
    //     const result = await service.login(authArgs);

    //     switch (result.status) {
    //         case AuthResultStatus.Success:
    //             break;
    //         case AuthResultStatus.Fail:
    //             break;
    //         case AuthResultStatus.Redirect:
    //             break;
    //     }
    // }


    function loginPasswordHandler() {
        setVisible(true);
    }
    function logoutPasswordHandler() {
        service.logout();
    }
    function finishHandler(_: LoginPasswordValue) {
        setVisible(false);
    }
    // #endregion

    // #region React Cicle
    // ======================================= React Cicle =======================================
    const [section, ] = useMemo(
        () => {
            return getUrlPart(location.pathname, [
                ClientModule.path,
                AdminModule.path
            ], !!match.params.lang);
        }, [location.pathname, match.params.lang]);
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    const isAuth = service.authenticated();
    return (
        <Header className="header">
            <Link className="logo" to={buildRoute(lang?.code!, lang?.byUser!)} />

            <Menu theme="dark" mode="horizontal" selectedKeys={[section]}>
                {isAuth ? getAuthMenuItems() : getAnonMenuItems()}
            </Menu>

            <Modal
                closable={false}
                destroyOnClose={true}
                visible={visible}
                okText={intl.formatMessage({ id: 'action.login' })}
                cancelText={intl.formatMessage({ id: 'action.cancel' })}
                onCancel={() => setVisible(false)}
                onOk={() => formRef.current?.submit()}
            >
                <div className={styles.modalContainer}>
                    <LoginPasswordForm formRef={formRef} onFinish={finishHandler} />
                </div>
            </Modal>
        </Header>
    )
    // #endregion
}

const mapStateToProps = (state: any) => ({
    lang: AppActions.get(state).lang
})
export default connect(mapStateToProps)(withRouter(AppHeader));