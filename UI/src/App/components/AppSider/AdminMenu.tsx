import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

import AdminModule from 'src/modules/admin/components';

import { buildRoute } from 'src/App/helpers/string';


const { Item } = Menu;

type AdminMenuProps = {
    selected: string;
    lang: string;
    byUser: boolean; 
}
function AdminMenu(props: AdminMenuProps) {
    const { selected, lang, byUser } = props;

    // #region Render
    // ========================================== Render =========================================
    return (
        <Menu className="menu" mode="inline" defaultSelectedKeys={[selected]}>
            <Item key={AdminModule.routes.config}>
                <Link to={buildRoute(lang, byUser, AdminModule.path, AdminModule.routes.config)}>
                    App Config
                </Link>
            </Item>
        </Menu>
    )
    // #endregion
}
export default AdminMenu;