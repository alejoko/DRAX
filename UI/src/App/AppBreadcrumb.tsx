import React from 'react';

import { Breadcrumb } from 'antd';


const { Item } = Breadcrumb;

function AppBreadcrumb() {
    return (
        <Breadcrumb className="breadcrumb">
            <Item>Home</Item>
            <Item>List</Item>
            <Item>App</Item>
        </Breadcrumb>
    )
}
export default AppBreadcrumb;