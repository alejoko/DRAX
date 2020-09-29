import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Drawer, { DrawerProps }  from '@material-ui/core/Drawer';
import { DrawerActions } from 'src/App/redux/actions';

export type ReduxDrawerProps = {
    children?: JSX.Element;
    drawerProps?: DrawerProps;
};

const ReduxDrawer = ({ children, drawerProps }: ReduxDrawerProps) => {
    return (
        <Drawer {...drawerProps}>
            {children}
        </Drawer>
    )
};

ReduxDrawer.propTypes = {
    children: PropTypes.element
};

const mapStateToProps = (state: any) => {
    const { children, drawerProps } = DrawerActions.get(state);
    return {
        children,
        drawerProps
    }
};

export default connect(mapStateToProps)(ReduxDrawer);