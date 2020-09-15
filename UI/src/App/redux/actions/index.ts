import { Constants } from './constants';

import RouteActions from './RouteActions';
import AppActions, { AppStore as AppStoreX } from './AppActions';
import DrawerActions, { DrawerStore as DrawerStoreX } from './DrawerActions';

import appRegisterReducers from '../reducers';


appRegisterReducers();

export {
    Constants,
    AppActions,
    RouteActions,
    DrawerActions
};
export type AppStore = AppStoreX;
export type DrawerStore = DrawerStoreX;
