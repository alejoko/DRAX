import Search from '@material-ui/icons/Search';
import StarBorder from '@material-ui/icons/StarBorder';
import FolderOpen from '@material-ui/icons/FolderOpen';
import HelpOutline from '@material-ui/icons/HelpOutline';

import ClientModule from 'src/modules/client/components';

export const sideBarItems = [
    {
        key: "companySearch",
        path: ClientModule.path,
        routes: ClientModule.routes.companySearch,
        icon: Search
    },
    {
        key: "watchList",
        path: ClientModule.path,
        routes: ClientModule.routes.watchList,
        icon: StarBorder
    },
    {
        key: "mySearches",
        path: ClientModule.path,
        routes: ClientModule.routes.mySearches,
        icon: FolderOpen
    },
    {
        key: "how ItWorks",
        path: ClientModule.path,
        routes: ClientModule.routes.howItWorks,
        icon: HelpOutline
    }
];