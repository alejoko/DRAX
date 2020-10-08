import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        others: {
            darkestColor: string;
            darkerColor: string;
            darkColor: string;
            darkBlue: string;
            teal: string;
            cyan: string;
            salmon: string;
            darkTeal: string;
            greyBlue: string;
            fauxWater: string;
            main: string;
        }
    }
}

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        globals: {
            topBarMinHeight: number;
            leftNavMaxWidth: number;
            appBody: number;
        }
    }
}

declare module '@material-ui/core/styles/createMixins' {
    interface Mixins {
        appHeader: object;
        sideBar: object;
        appBody: object;
    }
}

const themeName = 'draxTheme';
const baseStyles = {
    // Colors
    palette: {
        primary: {
            main: '#2db6d4'
        },
        secondary: {
            main: '#e05c55'
        },
        text: {
            primary: '#2d2d44',
        },
        others: {
            darkestColor: '#2d2d44',
            darkerColor: '#33344e',
            darkColor: '#1c2f37',
            darkBlue: '#087ca7',
            teal: '#37b1b3',
            cyan: '#6cfbf1',
            salmon: '#e05c55',
            darkTeal: '#2b7a78',
            greyBlue: '#84acbc',
            fauxWater: '#def2f1'
        }
    },
    // Typography
    typography: {
        fontFamily: 'Lato, sans-serif',
        body1: {
            fontSize: 14,
            lineHeight: 1.5,
        },
    },
    // Theme overrides
    overrides: {
        MuiLink: {
            root: {
                cursor: 'pointer',
                color: '#087ca7',
                fontSize: 14,
                '& .MuiSvgIcon-root': {
                    fontSize: 10,
                    marginLeft: 3,
                    transform: 'translate(0, 1px)'
                },
            },
        },
        MuiCssBaseline: {
            '@global': {
                html: {
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                },
                body: {
                    backgroundImage: 'linear-gradient(to right, #087ca7 0%, #2db6d5 50%, #48e1d9 100%)',
                    margin: 0,
                    padding: 0
                }
            },
        },
    },
    // Mixins
    mixins: {
        appHeader: {
            marginLeft: 0,
            "@media (min-width:600px)": {
                width: `calc(100% - 160px)`,
                height: 100,
                marginLeft: 160
            }
        },
        sideBar: {
            // maxWidth: 56,
            "@media (min-width:600px)": {
                maxWidth: 160
            }
        },
        appBody: {
            width: `calc(100% - ${160}px)`,
            marginLeft: 0,
            minHeight: `calc(100% - ${100}px)`,
            "@media (min-width:600px)": {
                width: `calc(100% - 160px)`,
                marginLeft: 160,
                minHeight: `calc(100% - 100px)`,
                marginTop: 100,
            }
        }
    },
};

export default createMuiTheme(baseStyles, { themeName });