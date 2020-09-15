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
}
function Opener<T = any>(props: OpenerProps<T>) {
    const { opener, value, onChange, toTextAsync, beforeOpenAsync, defaultVisible, children } = props;

    const [label, setLabel] = useState<string>();
    const [visible, setVisible] = useState<boolean>(!!defaultVisible);

    // #region Event
    // ========================================== Event ==========================================
    async function handleOpen() {
        if (beforeOpenAsync) {
            const { value: enrichValue, update } = await beforeOpenAsync(value);
            if (update && onChange) {
                onChange(enrichValue);
            }
        }
        setVisible(true);
    }
    function handleClose(accept: boolean, value?: T) {
        setVisible(false);
        if (accept && onChange) {
            onChange(value);
        }
    }
    // #endregion

    // #region React Cicle
    // ======================================= React Cicle =======================================
    useEffect(() => {
        if (toTextAsync) {
            (async () => {
                const text = await toTextAsync(value);
                setLabel(text);
            })();
        } else {
            setLabel(value && `${value}`);
        }
    }, [value, toTextAsync])
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    return (
        <Fragment>
            {opener(handleOpen, visible, value, label)}
            {children(handleClose, visible, value, label)}
        </Fragment>
    );
    // #endregion
}

export default Opener;