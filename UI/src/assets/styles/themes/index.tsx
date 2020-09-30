import { createMuiTheme } from '@material-ui/core/styles';

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
    other: {
      darkestColor: '#2d2d44',
      darkerColor: '#33344e',
      darkColor: '#1c2f37',
      darkBlue: '#087ca7',
      teal: '#37b1b3',
      cyan: '#6cfbf1',
      salmon: '#e05c55',
      darkTeal: '#2b7a78',
      greyblue: '#84acbc',
      fauxWater: '#def2f1',
      white: '#fff'
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
          margin: 0,
          padding: 0
        }
      },
    },
  }
};

export default createMuiTheme(baseStyles, { themeName });