import { fade, makeStyles } from '@material-ui/core/styles';

export default {
    appHeaderStyles: makeStyles((theme) => ({
        root: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            ...theme.mixins.appHeader
        },
        contentWrapper: {
            height: '100%',
            padding: theme.spacing(3),
            color: theme.palette.common.white
        },
        welcomeMessage: {
            fontSize: 32,
            fontWeight: 700,
            [theme.breakpoints.up('md')]: {
                backgroundColor: 'red',
              },
            "@media (min-width:1440px)": {
                maxWidth: 160
            }
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
            width: '60%',
            color: theme.palette.common.white,
            padding: theme.spacing(0,0,0,2),
            marginRight: theme.spacing(1)
        },
        searchInputIcon: {
            color: theme.palette.common.white,
            opacity: .6
        },
        inputRoot: {
            color: 'inherit',
        },
    }))
}