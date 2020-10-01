import { fade, makeStyles } from '@material-ui/core/styles';

export default {
    appHeaderStyles: makeStyles((theme) => ({
        root: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            width: `calc(100% - ${theme.globals.leftNavMaxWidth}px)`,
            height: theme.globals.topBarMinHeight,
            marginLeft: theme.globals.leftNavMaxWidth,
            '&::before': {
                content: '""',
                backgroundImage: 'linear-gradient(to bottom, #0000004c, #00000000)',
                width: '100%',
                height: 250,
                position: 'absolute',
                top: 0,
                left: 0,
            }
        },
        contentWrapper: {
            height: '100%',
            padding: theme.spacing(3),
            color: theme.palette.common.white
        },
        welcomeMessage: {
            fontSize: 32,
            fontWeight: 700
        },
        otherText: {
            fontSize: 14,
            fontWeight: 900
        },
        logOutLink: {
            color: 'inherit',
            opacity: .6
        },
        menuLink: {
            fontSize: 22,
            opacity: .6,
            color: theme.palette.common.white,
            textDecoration: 'none',
            paddingTop: theme.spacing(1),
            margin: theme.spacing(0,3)
        },
        menuLinkSelected: {
            opacity: 1,
            fontWeight: 900
        },
        searchInput: {
            backgroundColor: fade(theme.palette.common.white, 0.15),
            padding: theme.spacing(0,0,0,2)
        },
        inputRoot: {
            color: 'inherit',
        },
    }))
}