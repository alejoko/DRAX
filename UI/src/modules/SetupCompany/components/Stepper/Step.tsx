import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

type StepProps = {
    children?: ReactNode;
    label?: string;
};

const Step = ({label, children}: StepProps) => {
    return <div>
        <h3>{label}</h3>
        {children}
    </div>;
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