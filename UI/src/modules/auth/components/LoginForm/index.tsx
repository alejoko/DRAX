import React, { forwardRef, createRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

import { Formik, Form } from 'formik';

import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from "@material-ui/core/styles";

import loginSchema from '../../schema/loginAuthSchema';
import { useAuthService } from 'src/App/hooks/AuthProvider';

import { AppActions } from 'src/App/redux/actions';

import { AuthResultStatus } from 'src/App/services/auth/_auth.type';
import { AuthPasswordLoginArgs } from 'src/App/services/auth/auth-password.service';

export type LoginFormValues = {
    username?: string;
    password?: string;
    rememberMe: boolean;
}

export type LoginFormProps = {
    bindHandleSubmit?: (values: Function) => void;
    onFinish?: (values: LoginFormValues) => void;
    showGlobalSpin?: (text?: string) => void;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginForm = forwardRef<HTMLFormElement, LoginFormProps>((props, ref) => {
    const classes = useStyles();
    const formRef = createRef<HTMLFormElement>();

    const {onFinish, showGlobalSpin, bindHandleSubmit} = props;
    const intl = useIntl();
    const { service } = useAuthService();
    const initialValues: LoginFormValues = { username: '', password: '', rememberMe: false };

    async function handleFinish(values: LoginFormValues) {
        const loginArgs: AuthPasswordLoginArgs = {
            username: values.username!,
            password: values.password!,
            rememberMe: values.rememberMe
        };

        showGlobalSpin!(intl.formatMessage({ id: 'loading.authenticate' }));
        const result = await service.login(loginArgs);

        switch (result.status) {
            case AuthResultStatus.Success:
                if (onFinish) {
                    onFinish(values);
                }
                break;
            case AuthResultStatus.Fail:
                break;
            case AuthResultStatus.Redirect:
                break;
        }
        showGlobalSpin!();
    }

    function onFinishFailed(/*errorInfo: ValidateErrorEntity*/) {
        console.log('Failed');
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={{ username: '', password: '', rememberMe: false }}
                    validationSchema={loginSchema}
                    onSubmit={values => {
                        console.log(values);
                    }}

                >
                    {({errors, handleChange, touched, handleSubmit}) => {
                        bindHandleSubmit && bindHandleSubmit(handleSubmit);
                        return (
                            <Form className={classes.form} ref={formRef}>
                                <TextField
                                    error={errors.username && touched.username || false}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    onChange={handleChange}
                                    id="username"
                                    label="Nombre de usuario"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    helperText={
                                        errors.username && touched.username ? errors.username : null
                                    }
                                />
                                <TextField
                                    error={errors.password && touched.password || false}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    onChange={handleChange}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    helperText={
                                        errors.password && touched.password ? errors.password : null
                                    }
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </Container>
    )
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    showGlobalSpin: (text?: string) => dispatch(AppActions.actionShowGlobalSpin(!!text, text))
});

export default connect(null, mapDispatchToProps)(LoginForm);