import React from 'react';

import { Button, Tooltip } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { TooltipProps } from 'antd/lib/tooltip';

import { OpenFactory } from './_types';


/**
 * Create button openner
 * @param props 
 */
function withButton<T = any>(tootipProps?: TooltipProps, btProps?: ButtonProps): OpenFactory<T> {
    const TooltipRender: any = Tooltip;
    return (onOpen, visible, _, value) => (
        <TooltipRender {...tootipProps}>
            <Button
                {...btProps}
                disabled={visible}
                value={`${value}`}
                onClick={onOpen}
            />
        </TooltipRender>
    )
}

export default withButton;