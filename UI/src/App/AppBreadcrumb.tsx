import React from 'react';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

export default function AppBreadcrumb() {
    return (
        <Breadcrumbs className="breadcrumb">
            <Link>Home</Link>
            <Link>List</Link>
            <Link>App</Link>
        </Breadcrumbs>
    )
};