import React, { Fragment } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Button } from '@material-ui/core';

export default function Home() {
    return (
        <Fragment>
            <Link to="/en">EN</Link> | <Link to="/">RESET</Link>
            <br />
            <span>{moment.locale()}</span>
            <br />
            <FormattedMessage id="app.title" />
            <Button size="small" variant="contained" color="primary">Match</Button>

            <p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p>
            <p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p>
            <p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p>
            <p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p>
            <p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p>
        </Fragment>
    )
}