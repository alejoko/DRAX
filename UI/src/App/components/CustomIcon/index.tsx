import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function CustomIcon(props: any) {
    const {icon, ...otherProps} = props;
    return (
        <SvgIcon {...otherProps}>
            <g fill="currentColor">
                {icon}
            </g>
        </SvgIcon>
    );
}