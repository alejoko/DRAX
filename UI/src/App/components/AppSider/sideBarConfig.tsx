import ClientModule from 'src/modules/client/components';
import {
  MainMenuTarget,
  MainMenuFavorite,
  MainMenuFolder,
  MainMenuHelp
} from '../shared/Icons';


export const sideBarItems = [
    {
        key: "companySearch",
        path: ClientModule.path,
        routes: ClientModule.routes.companySearch,
        icon: MainMenuTarget
    },
    {
        key: "watchList",
        path: ClientModule.path,
        routes: ClientModule.routes.watchList,
        icon: MainMenuFavorite
    },
    {
        key: "mySearches",
        path: ClientModule.path,
        routes: ClientModule.routes.mySearches,
        icon: MainMenuFolder
    },
    {
        key: "how ItWorks",
        path: ClientModule.path,
        routes: ClientModule.routes.howItWorks,
        icon: MainMenuHelp
    }
];