import * as yup from 'yup';

//TODO: add validations rules
//TODO: add intl

const loginSchema = yup.object().shape({
    username: yup.string().required('This field is required.'),
    password: yup
        .string()
        .min(6, "Password is too short.")
        .max(20, "Password is too long.")
        .required("This field is required."),
    rememberMe: yup.bool()
});

export default loginSchema;
