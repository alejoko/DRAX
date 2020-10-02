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
        }
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
        color: '#2d2d44'
    },
    // Theme overrides
    overrides: {
        MuiLink: {
            root: {
                cursor: 'pointer'
            }
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
    // Global variables
    globals: {
        topBarMinHeight: 100,
        leftNavMaxWidth: 160,
    }
};

export default createMuiTheme(baseStyles, { themeName });