import React, { Fragment, useEffect, useState } from 'react';
import { OpenFactory, CloseFactory } from './_types';

export type OpenerProps<T> = {
    value?: T;
    onChange?: (value?: T) => void;
    defaultVisible?: boolean;
    toTextAsync?: (value?: T) => Promise<string>;
    beforeOpenAsync?: (value?: T) => Promise<{ value: T, update: boolean }>;
    opener: OpenFactory<T>;
    children: CloseFactory<T>;
};

export default function Opener<T = any>({ opener, value, onChange, toTextAsync, beforeOpenAsync, defaultVisible, children }: OpenerProps<T>) {
    const [label, setLabel] = useState<string>();
    const [visible, setVisible] = useState<boolean>(!!defaultVisible);

    async function handleOpen() {
        if (beforeOpenAsync) {
            const { value: enrichValue, update } = await beforeOpenAsync(value);
            update && onChange && onChange(enrichValue);
        }
        setVisible(true);
    };

    const handleClose = (accept: boolean, value?: T) => {
        setVisible(false);
        accept && onChange && onChange(value);
    };

    useEffect(() => {
        if (toTextAsync) {
            (async () => {
                const text = await toTextAsync(value);
                setLabel(text);
            })();
        } else {
            setLabel(value && `${value}`);
        }
    }, [value, toTextAsync]);

    return (
        <Fragment>
            {opener(handleOpen, visible, value, label)}
            {children(handleClose, visible, value, label)}
        </Fragment>
    );
};