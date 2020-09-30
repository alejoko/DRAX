import React, { useState, createRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import {useIntl} from 'react-intl';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

import Modal from '../Modal/index';
import ClientModule from 'src/modules/client/components';
import LoginForm, { LoginFormValues } from 'src/modules/auth/components/LoginForm';

import { useAuthService } from '../../hooks/AuthProvider';
import { buildRoute } from 'src/App/helpers/string';

import { AppActions } from 'src/App/redux/actions';
import { ChangeLangPayload } from 'src/App/redux/actions/AppActions';

export type AppHeaderProps = RouteComponentProps<{ lang: string }> & {
    lang?: ChangeLangPayload;
};

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
}));

const AppHeader = ({ lang }: AppHeaderProps) => {
    const classes = useStyles();
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
                <AccountCircle />
            </IconButton>
        </Toolbar>;


    const getAuthMenuItems = () =>
        <Toolbar>
           <Link to={buildRoute(lang ?.code!, lang?.byUser!, ClientModule.path, ClientModule.routes.home)}>
               {intl.formatMessage({id: 'main-menu.client'})}
           </Link>

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder={intl.formatMessage({ id: 'main-menu.search'})}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <IconButton color="inherit">
                <Badge badgeContent={1} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={logoutPasswordHandler}>
                <AccountCircle />
            </IconButton>
        </Toolbar>;

    return (
        <AppBar position="fixed">
            <Grid container direction="row" justify="flex-end" alignItems="baseline">
                { isAuth ? getAuthMenuItems() : getAnonMenuItems() }
            </Grid>
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