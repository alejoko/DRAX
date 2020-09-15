import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

import ClientModule from 'src/modules/client/components';

import { buildRoute } from 'src/App/helpers/string';


const { Item } = Menu;

type ClientMenuProps = {
    selected: string;
    lang: string;
    byUser: boolean; 
}
function ClientMenu(props: ClientMenuProps) {
    const { selected, lang, byUser } = props;

    // #region Render
    // ========================================== Render =========================================
    return (
        <Menu className="menu" mode="inline" defaultSelectedKeys={[selected]}>
            <Item key="home">
                <Link to={buildRoute(lang, byUser, ClientModule.path, ClientModule.routes.home)}>
                    Home
                </Link>
            </Item>
            <Item key={ClientModule.routes.search}>
                <Link to={buildRoute(lang, byUser, ClientModule.path, ClientModule.routes.search)}>
                    Search
                </Link>
            </Item>
        </Menu>
    )
    // #endregion
}
export default ClientMenu;