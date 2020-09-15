import React from 'react';
import { Link } from 'react-router-dom';

import { Result } from 'antd';


function Forbiden() {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Link to="/">Back Home</Link>}
        />
    )
}
Forbiden.path = 'forbiden';

function NotFound() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link to="/">Back Home</Link>}
        />
    )
}
NotFound.path = 'notfound';

function Error() {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={<Link to="/">Back Home</Link>}
        />
    )
}
Error.path = 'error';

export { Forbiden, NotFound, Error };