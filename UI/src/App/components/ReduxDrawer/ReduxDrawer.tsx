import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Drawer } from 'antd';
import { DrawerProps } from 'antd/lib/drawer';
import { DrawerActions } from 'src/App/redux/actions';


export type ReduxDrawerProps = {
    children?: JSX.Element;
    drawerProps?: DrawerProps;
}
function ReduxDrawer(props: ReduxDrawerProps) {
    const { children, drawerProps } = props;

    // #region Render
    // ========================================== Render =========================================
    return (
        <Drawer {...drawerProps}>
            {children}
        </Drawer>
    )
    // #endregion
}
ReduxDrawer.propTypes = {
    children: PropTypes.element
}

const mapStateToProps = (state: any) => {
    const { children, drawerProps } = DrawerActions.get(state);
    return {
        children,
        drawerProps
    }
}
export default connect(mapStateToProps)(ReduxDrawer);