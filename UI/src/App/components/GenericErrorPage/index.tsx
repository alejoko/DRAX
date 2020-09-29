import React from 'react';

import Alert, { AlertProps } from '@material-ui/lab/Alert';

export { default as genericErrorPageConfig } from './genericErrorPageConfig';

type GenericErrorPageProps = AlertProps & {
    message?: string;
};

const GenericErrorPage = ({severity, message}: GenericErrorPageProps) => <Alert severity={severity}>{message}</Alert>;

export default GenericErrorPage;