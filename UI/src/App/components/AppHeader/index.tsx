import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import {useIntl} from 'react-intl';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from './styles';

import Modal from '../Modal/index';
import ClientModule from 'src/modules/client/components';
import LoginForm, { LoginFormValues } from 'src/modules/auth/components/LoginForm';

import { useAuthService } from '../../hooks/AuthProvider';
import { buildRoute } from 'src/App/helpers/string';

import { AppActions } from 'src/App/redux/actions';
import { ChangeLangPayload } from 'src/App/redux/actions/AppActions';
import { Search, User, Notifications } from '../shared/Icons';

export type AppHeaderProps = RouteComponentProps<{ lang: string }> & {
    lang?: ChangeLangPayload;
};

const AppHeader = ({ lang }: AppHeaderProps) => {
    const classes = styles.appHeaderStyles();
    const intl = useIntl();
    const [visible, setVisible] = useState(false);  // only for modal
    const { service } = useAuthService();

    let bindedHandleSubmit : Function = () => {};
    const bindHandleSubmit = (handleSubmit: Function ) => { bindedHandleSubmit = handleSubmit; };

    const loginClickHandler = () => { setVisible(true); };
    const logoutPasswordHandler = () => { console.log('logout'); service.logout(); };
    const finishHandler = (/*_: LoginFormValues*/) => { bindedHandleSubmit(); };

    const isAuth = service.authenticated();

    const getAnonMenuItems = () =>
        <Toolbar>
            <IconButton color="inherit" onClick={loginClickHandler}>
                <User />
            </IconButton>
        </Toolbar>;


    const getAuthMenuItems = () =>
        <Toolbar>
            <Grid container>
                <Grid item xs={4}>
                    <Box display='inline-block'>
                        <Typography className={classes.welcomeMessage}>Hello Matthew, welcome back!</Typography>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography className={classes.otherText}>Last login at 22 June 2020, 18:38</Typography>
                            <Link
                                className={`${classes.otherText} ${classes.logOutLink}`}
                                to={buildRoute(lang ?.code!, lang?.byUser!, ClientModule.path, ClientModule.routes.home)}>Logout</Link>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Link
                            className={classes.menuLink}
                            to={buildRoute(lang ?.code!, lang?.byUser!, ClientModule.path, ClientModule.routes.home)}>
                            {intl.formatMessage({id: 'main-menu.drx.executive'})}
                        </Link>
                        <Link
                            className={`${classes.menuLink} ${classes.menuLinkSelected}`}
                            to={buildRoute(lang ?.code!, lang?.byUser!, ClientModule.path, ClientModule.routes.home)}>
                            {intl.formatMessage({id: 'main-menu.leadership.dynamics'})}
                        </Link>
                        <Link
                            className={classes.menuLink}
                            to={buildRoute(lang ?.code!, lang?.byUser!, ClientModule.path, ClientModule.routes.home)}>
                            {intl.formatMessage({id: 'main-menu.pace'})}
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box display='flex' justifyContent='flex-end'>
                        <InputBase
                            placeholder={intl.formatMessage({ id: 'main-menu.search'})}
                            className={classes.searchInput}
                            inputProps={{ 'aria-label': 'search' }}
                            endAdornment={<IconButton>
                                <Search className={classes.searchInputIcon} />
                            </IconButton>}
                        />
                        <IconButton color="inherit">
                            <Badge badgeContent={1} variant="dot" color="secondary">
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={logoutPasswordHandler}>
                            <User />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Toolbar>;

    return (
        <AppBar
            className={classes.root}
            position="fixed"
        >
            <Box className={classes.contentWrapper}>
                { !isAuth ? getAuthMenuItems() : getAnonMenuItems() }
            </Box>
            <Modal
                open={visible}
                onDiscard={() => setVisible(false)}
                onConfirm={() => finishHandler()}
            >
                <LoginForm bindHandleSubmit={bindHandleSubmit} onFinish={finishHandler} />
            </Modal>
        </AppBar>
    )
};

const mapStateToProps = (state: any) => ({
    lang: AppActions.get(state).lang
});

export default connect(mapStateToProps)(withRouter(AppHeader));