import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Button } from 'antd';

import TagSelect from 'src/modules/admin/shared/TagSelect';


function Home() {
    return (
        <div>
            <Link to="/en">EN</Link> | <Link to="/">RESET</Link>
            <br />
            <span>{moment.locale()}</span>
            <br />
            <FormattedMessage id="app.title" />
            <Button type="primary">Match</Button>
            <TagSelect />
            <p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p>
            <p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p>
            <p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p>
            <p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p>
            <p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p><p>sssssss</p>
        </div>
    )
}
export default Home;