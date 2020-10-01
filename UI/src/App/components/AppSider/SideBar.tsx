import React from 'react';
import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import styles from './styles';

import { buildRoute } from 'src/App/helpers/string';
import { sideBarItems } from './sideBarConfig';
import draxLogo from '../../../assets/images/svgs/drax-logo.svg'

type SideBarProps = {
    selected: string;
    lang: string;
    byUser: boolean;
};

//TODO: fix add logo
export default function SideBar({ selected, lang, byUser }: SideBarProps) {
    const classes = styles.sideBarStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open
        >
            <Link className={classes.mainLogo} to={buildRoute(lang, byUser)}>
                <img src={draxLogo} alt='Drax' />
            </Link>
            <List>
                {sideBarItems.map(element =>
                    <ListItem
                      key={element.key}
                      className={classes.sideNavItem}>
                        <Link
                          key={element.key}
                          className={classes.sideNavItemLink}
                          to={buildRoute(lang, byUser, element.path, element.routes)}>
                            <ListItemIcon className={classes.sideNavItemLinkIcon}>
                                <element.icon />
                            </ListItemIcon>
                        </Link>
                    </ListItem>)
                }
             </List>
        </Drawer>
    )
};