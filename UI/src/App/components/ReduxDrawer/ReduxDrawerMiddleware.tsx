import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';


import { DrawerProps } from 'antd/lib/drawer';
import { DrawerActions, DrawerStore } from 'src/App/redux/actions';


export type ReduxDrawerMiddlewareProps = DrawerProps & {
    children?: JSX.Element;
    actionChangeDrawerProps?: any;
    currDrawerStore?: DrawerStore;
}
/** Middleware to transform props data into redux data. */
function ReduxDrawerMiddleware(props: ReduxDrawerMiddlewareProps) {
    const { visible, children, actionChangeDrawerProps, currDrawerStore, ...rest } = props;

    // #region React Cicle
    // ======================================= React Cicle =======================================
    useEffect(() => {
        if (visible) {
            actionChangeDrawerProps({ 
                children,
                drawerProps: { ...rest, visible }
            });
        } else if (currDrawerStore!.drawerProps.visible) {
            actionChangeDrawerProps({
                children: undefined,
                drawerProps: { visible: false, destroyOnClose: true }
            })
        }
        // eslint-disable-next-line
    }, [visible]);
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    return <Fragment />;
    // #endregion
}
const mapStateToProps = (state: any) => ({
    currDrawerStore: DrawerActions.get(state)
})
const mapDispatchToProps = {
    actionChangeDrawerProps: DrawerActions.actionChange
}
export default connect(mapStateToProps, mapDispatchToProps)(ReduxDrawerMiddleware);
