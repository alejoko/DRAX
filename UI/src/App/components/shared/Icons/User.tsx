import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export default function Search(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <g fill="currentColor">
                <path d="M11,13.5 C16.799,13.5 21.5,18.201 21.5,24 L20,24 C20,19.02975 15.97025,15 11,15 C6.02975,15 2,19.02975 2,24 L0.5,24 C0.5,18.201 5.201,13.5 11,13.5 Z M11,0 C14.3135,0 17,2.6865 17,6 C17,9.3135 14.3135,12 11,12 C7.6865,12 5,9.3135 5,6 C5,2.6865 7.6865,0 11,0 Z M11,1.5 C8.5145,1.5 6.5,3.5145 6.5,6 C6.5,8.4855 8.5145,10.5 11,10.5 C13.4855,10.5 15.5,8.4855 15.5,6 C15.5,3.5145 13.4855,1.5 11,1.5 Z" />
            </g>
        </SvgIcon>
    );
}