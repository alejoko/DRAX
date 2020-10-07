import React, { ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';

type StepProps = {
    children?: any;
    label?: string;
};

const Step = ({children}: StepProps) => {
    return children;
};

Step.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
};

export default Step;