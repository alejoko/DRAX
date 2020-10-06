import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { orange, purple } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import { roundTextFieldStylesHook } from '@mui-treasury/styles/textField/round';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: orange[700],
        },
        secondary: {
            main: purple[700],
        },
    },
});

function Search(props: any) {
    const { match } = props;
    const [ text, setText ] = React.useState('text');

    const inputBaseStyles = roundTextFieldStylesHook.useInputBase();
    const inputLabelStyles = roundTextFieldStylesHook.useInputLabel();
    const helperTextStyles = roundTextFieldStylesHook.useHelperText();

    return (
        <>
            <TextField
                error
                label={'Error field'}
                placeholder={'Placeholder'}
                helperText={'Helper Text'}
                margin={'normal'}
                onChange={(event: any) => { setText(event.target.value) }}
                value={ text }
                InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
                InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
                FormHelperTextProps={{ classes: helperTextStyles }}
            />
        </>
    )
}

const RoundSearchStyle = () => (
    <ThemeProvider theme={theme}>
      <Search    />
    </ThemeProvider>
  );
  
export default RoundSearchStyle;