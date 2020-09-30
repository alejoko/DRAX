import React from 'react';
import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { buildRoute } from 'src/App/helpers/string';
import { sideBarItems } from './sideBarConfig';

const drawerWidth = 77;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    }
}));

type SideBarProps = {
    selected: string;
    lang: string;
    byUser: boolean;
};

//TODO: fix add logo
export default function SideBar({ selected, lang, byUser }: SideBarProps) {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Link className="logo" to={buildRoute(lang, byUser)} />
            <List>
                {sideBarItems.map(element =>
                    <ListItem key={element.key}>
                        <Link key={element.key} to={buildRoute(lang, byUser, element.path, element.routes)}>
                        <ListItemIcon>
                            <element.icon/>
                        </ListItemIcon>
                        </Link>
                    </ListItem>)
                }
             </List>
        </Drawer>
    )
};