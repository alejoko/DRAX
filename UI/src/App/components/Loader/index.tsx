import React from 'react';

import { Spin } from 'antd';


export type LoaderProps = {
    text?: string;
    loading: boolean
}
function Loader(props: LoaderProps) {
    const { text, loading } = props;

    // #region Render
    // ========================================== Render =========================================
    if (!loading)
        return null;

    return (
        <div className="spinner-backdrop">
            <div className="spinner-container">
                <Spin tip={text} spinning={loading} size="large" />
            </div>
        </div>
    );
    // #endregion
}

export default Loader;