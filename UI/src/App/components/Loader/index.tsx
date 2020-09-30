import React from 'react';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

export type LoaderProps = {
    text?: string;
    loading: boolean;
};

export default function Loader({ loading, text }: LoaderProps) {
    const spinner = loading ? <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
    >
        <CircularProgress></CircularProgress>
    </Box> : null;

    return (spinner);
};