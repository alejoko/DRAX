import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { DrawerProps }  from '@material-ui/core/Drawer';
import { DrawerActions, DrawerStore } from 'src/App/redux/actions';

export type ReduxDrawerMiddlewareProps = DrawerProps & {
    children?: JSX.Element;
    actionChangeDrawerProps?: any;
    currDrawerStore?: DrawerStore;
}
/** Middleware to transform props data into redux data. */
const ReduxDrawerMiddleware = ({ open, children, actionChangeDrawerProps, currDrawerStore, ...rest }: ReduxDrawerMiddlewareProps) => {
    useEffect(() => {
        if (open) {
            actionChangeDrawerProps({ 
                children,
                drawerProps: { ...rest, open }
            });
        } else if (currDrawerStore!.drawerProps.open) {
            actionChangeDrawerProps({
                children: undefined,
                drawerProps: { open: false }
            })
        }
        // eslint-disable-next-line
    }, [open]);

    return <Fragment />;
};

const mapStateToProps = (state: any) => ({
    currDrawerStore: DrawerActions.get(state)
});

const mapDispatchToProps = {
    actionChangeDrawerProps: DrawerActions.actionChange
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDrawerMiddleware);