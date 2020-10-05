import React, { ReactNode, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

type StepperProps = {
    children?: JSX.Element | JSX.Element[];
    activeStep?: number;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '75%',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '33px', //theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
        },
    }),
);

export default function  Stepper ({activeStep, children}: StepperProps) {
    const classes = useStyles();
    const [currentStep, setCurrentStep] = useState(0);
    const steps = children instanceof Array ? children : [children];

    const handlePrev = () => {
        const next = currentStep === 0 ? steps.length - 1 : currentStep - 1;
        setCurrentStep(next);
    };

    const handleNext = () => {
        const next = currentStep === steps.length - 1 ? 0 : currentStep + 1;
        setCurrentStep(next);
    };

    useEffect(() => {
        const current = activeStep ?? steps?.findIndex(child => child?.props?.active) ?? 0;
        current > -1 && setCurrentStep(current);
    }, [activeStep, children]);

    return <Box className={classes.root}>
        {steps[currentStep]}
        <Button color="primary" onClick={handlePrev}>Prev </Button>
        <Button variant="contained" color="secondary" onClick={handleNext}>Next</Button>
    </Box>;
};

Stepper.propTypes = {
    activeStep: PropTypes.number,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
};