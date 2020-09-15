import { Constants } from './constants';
import { actionCreator } from 'src/App/helpers/redux';


export type AppInitPayload = boolean;
export type ChangeLangPayload = {
    code: string;
    byUser: boolean;
};
export type ShowGlobalSpinPayload = {
    visible: boolean;
    tip?: string;
};
export type ScreenResizePayload = {
    width: number;
    height: number;
};
export type SignalRPayload = {
    connected: boolean;
    connectionId?: string;
}
export type AppStore = {
    init: AppInitPayload;
    lang: ChangeLangPayload;
    screen?: ScreenResizePayload;
    globalSpin: ShowGlobalSpinPayload;
};

const st = 'stApp';
const initAction = actionCreator<AppInitPayload>(Constants.APP_INIT);
const changeLangAction = actionCreator<ChangeLangPayload>(Constants.LANG_UPDATE);
const screenResizeAction = actionCreator<ScreenResizePayload>(Constants.SCREEN_RESIZE);
const showGlobalSpinAction = actionCreator<ShowGlobalSpinPayload>(Constants.SHOW_GLOBAL_SPIN);

/**
 * Action globals referent to app.
 */
abstract class AppActions {
    /** Name of the storage */
    public static get store() {
        return st;
    }

    /**
     * Get data for app storage
     * @returns If module initialized true, false in other case 
     */
    public static get = (state: any): AppStore => state[st];
    /** 
     * Dispatch init application action
     */
    public static actionInit = () => initAction(true);
    /**
     * Update global redux languange state
     * @param lang Languaje code
     */
    public static actionChangeLang = (code: string, byUser: boolean) => changeLangAction({ code, byUser });
    public static actionScreenResize = (width: number, height: number) => screenResizeAction({ width, height });
    public static actionShowGlobalSpin = (visible: boolean, tip?: string) => showGlobalSpinAction({ visible, tip });
}
export default AppActions;