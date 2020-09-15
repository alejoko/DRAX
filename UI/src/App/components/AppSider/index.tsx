import React, { useMemo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import AdminMenu from './AdminMenu';
import ClientMenu from './ClientMenu';
import AdminModule from 'src/modules/admin/components';
import ClientModule from 'src/modules/client/components';

import { AppActions } from 'src/App/redux/actions';
import { ChangeLangPayload } from 'src/App/redux/actions/AppActions';

import { getUrlPart } from 'src/App/helpers/string';


const { Sider } = Layout;

export type AppSiderProps = RouteComponentProps<{ lang: string }> & {
    lang?: ChangeLangPayload;
}
function AppSider(props: AppSiderProps) {
    const { lang, match, location } = props;

    // #region Private
    // ========================================= Private =========================================
    function getClientMenu(section: string, selected: string) {
        switch (section) {
            case ClientModule.path:
                return (
                    <ClientMenu selected={selected} lang={lang?.code!} byUser={lang?.byUser!} />
                )
            case AdminModule.path:
                return (
                    <AdminMenu selected={selected} lang={lang?.code!} byUser={lang?.byUser!} />
                )
        }
    }
    // #endregion

    // #region React Cicle
    // ======================================= React Cicle =======================================
    const [section, selected] = useMemo(
        () => {
            return getUrlPart(location.pathname, [
                ClientModule.path,
                AdminModule.path
            ], !!match.params.lang);
        }, [location.pathname, match.params.lang]);
    // #endregion

    // console.log(section, selected)
    // #region Render
    // ========================================== Render =========================================
    return (
        <Sider className="sider" collapsible={true}>
            {getClientMenu(section, selected)}
        </Sider>
    )
    // #endregion
}

const mapStateToProps = (state: any) => ({
    lang: AppActions.get(state).lang
})
export default connect(mapStateToProps)(withRouter(AppSider))