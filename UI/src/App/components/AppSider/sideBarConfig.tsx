import ClientModule from 'src/modules/client/components';
import icons from '../../enums/icons';

export const sideBarItems = [
    {
        key: "companySearch",
        path: ClientModule.path,
        routes: ClientModule.routes.companySearch,
        icon: icons.mainMenuTarget
    },
    {
        key: "watchList",
        path: ClientModule.path,
        routes: ClientModule.routes.watchList,
        icon: icons.mainMenuFavorite
    },
    {
        key: "mySearches",
        path: ClientModule.path,
        routes: ClientModule.routes.mySearches,
        icon: icons.mainMenuFolder
    },
    {
        key: "how ItWorks",
        path: ClientModule.path,
        routes: ClientModule.routes.howItWorks,
        icon: icons.mainMenuHelp
    }
];