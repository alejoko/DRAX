import React, { ReactNode, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

type StepperProps = {
    children?: JSX.Element | JSX.Element[];
    activeStep?: number;
};

export default function  Stepper ({activeStep, children}: StepperProps) {
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

    return <div>
        <h2>{currentStep + 1} / {steps?.length} {steps && steps[currentStep]?.props?.label}</h2>
        {steps[currentStep]}
        <button onClick={handlePrev}>Prev </button>
        <button onClick={handleNext}>Next</button>
    </div>;
};

Stepper.propTypes = {
    activeStep: PropTypes.number,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
};