import { Constants } from './constants';
import { actionCreator } from 'src/App/helpers/redux';

import { DrawerProps } from 'antd/lib/drawer';


export type DrawerChangePayload = {
    children?: JSX.Element;
    drawerProps?: DrawerProps;
};
export type DrawerStore = {
    children?: JSX.Element;
    drawerProps: DrawerProps;
}

const st = 'stDrawer';
const changeAction = actionCreator<DrawerChangePayload>(Constants.DRAWER_CHANGE);

/**
 * Action globals referent to app.
 */
abstract class DrawerActions {
    /** Name of the storage */
    public static get store() {
        return st;
    }

    /**
     * Get data for app storage
     * @returns If module initialized true, false in other case 
     */
    public static get = (state: any): DrawerStore => state[st];
    /** 
     * Dispatch drawer props change action
     */
    public static actionChange = (props: DrawerChangePayload) => changeAction(props);
}
export default DrawerActions;