import React, { PropsWithChildren, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withRouter, RouteChildrenProps } from 'react-router-dom';

import { BackTop } from 'antd';


/**
 * Scropp windows to the top
 * @param props 
 */
function ScrollToTop(props: PropsWithChildren<RouteChildrenProps>) {
    const { children, location } = props;

    const [height, setHeight] = React.useState(window.innerHeight / 2)

    // #region React Cicle
    // ======================================= React Cicle =======================================
    useEffect(() => {
        window.onresize = () => setHeight(window.innerHeight / 2);
    }, []);
    useEffect(() => window.scrollTo(0, 0), [location.pathname]);
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    return (
        <Fragment>
            {children}
            <BackTop visibilityHeight={height} />
        </Fragment>
    )
    // #endregion
}
ScrollToTop.propTypes = {
    children: PropTypes.element.isRequired
}

const routeScrollToTop = withRouter(ScrollToTop as any);
export default routeScrollToTop;