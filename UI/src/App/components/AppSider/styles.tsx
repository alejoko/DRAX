import { makeStyles } from '@material-ui/core/styles';

export default {
    sideBarStyles: makeStyles((theme) => ({
        drawer: {
            '& .MuiDrawer-paper': {
                width: '100%',
                ...theme.mixins.sideBar
            }
        },
        mainLogo: {
            padding: theme.spacing(5, 0),
            display: 'flex',
            justifyContent: 'center',
            marginBottom: theme.spacing(11)
        },
        sideNavItem: {
            color: theme.palette.others.greyBlue,
            justifyContent: 'center',
            padding: theme.spacing(1.5, 0),
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            '&:not(:last-child)': {
                marginBottom: theme.spacing(4),
            }
        },
        sideNavItemSelected: {
            color: theme.palette.secondary.main,
            borderLeftColor: theme.palette.secondary.main,
            '& a': {
                opacity: 1
            }
        },
        sideNavItemLink: {
            color: 'inherit',
            opacity: .6,
            transition: `opacity ${theme.transitions.duration.complex}ms`,
            '&:hover': {
                opacity: 1
            },
            '&:[disabled]': {
                opacity: .25
            }
        },
        sideNavItemLinkIcon: {
            color: 'inherit',
            minWidth: 'auto',
            '& .MuiSvgIcon-root': {
                fontSize: 32
            }
        },
    }))
}