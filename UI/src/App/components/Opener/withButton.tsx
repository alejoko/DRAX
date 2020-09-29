import React from 'react';

import Button, { ButtonProps } from '@material-ui/core/Button';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';

import { OpenFactory } from './_types';

/**
 * Create button openner
 * @param props 
 */
export default function withButton<T = any>(tooltipProps?: TooltipProps, buttonProps?: ButtonProps): OpenFactory<T> {
    const TooltipRender: any = Tooltip;
    return (onOpen, visible, _, value) => (
        <TooltipRender {...tooltipProps}>
            <Button
                {...buttonProps}
                disabled={visible}
                value={`${value}`}
                onClick={onOpen}
            />
        </TooltipRender>
    )
};