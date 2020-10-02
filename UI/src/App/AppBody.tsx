import React from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { useIntl } from 'react-intl';

import Container from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

import GenericErrorPage from './components/GenericErrorPage';
import Home from 'src/modules/client/components/Home';
import ClientModule from 'src/modules/client/components';

import { fixUrlEnd } from 'src/App/helpers/string';

const useStyles = makeStyles((theme) => ({
    contentWrapper: {
        width: `calc(100% - ${theme.globals.leftNavMaxWidth}px)`,
        marginLeft: theme.globals.leftNavMaxWidth,
        minHeight: `calc(100% - ${theme.globals.topBarMinHeight}px)`,
        marginTop: theme.globals.topBarMinHeight,
        padding: theme.spacing(5),
        '&::before': {
            content: '""',
            backgroundImage: 'linear-gradient(to bottom, #0000004c, #00000000)',
            width: '100%',
            height: 250,
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -99999
        }
    }
}));

function AppBody(props: RouteComponentProps) {
    const { match } = props;
    const intl = useIntl();
    const path = React.useMemo(() => fixUrlEnd(match.url), [match.url]);
    const classes = useStyles();

    return (
        <Container className={classes.contentWrapper}>
            <Switch>
                <Route exact={true} path={path} component={Home}/>
                <Route path={`${path}${ClientModule.path}`} component={ClientModule} />
                <Route render={(props) => <GenericErrorPage severity="error" message={intl.formatMessage({ id: 'generic-error-page.default.message'})} />} />
            </Switch>
        </Container>
    )
};

export default withRouter(AppBody);