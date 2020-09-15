import React from 'react';
import { RouteComponentProps } from 'react-router';


function Search(props: RouteComponentProps) {
    const { match } = props;

    return (
        <div>
            {`${match.url}/qw12`}
        </div>
    )
}
export default Search;