import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { AppActions } from 'src/App/redux/actions';
import { ChangeLangPayload } from 'src/App/redux/actions/AppActions';

const Team = () => {
    return (
        <>
            module team
        </>
    )
};

const mapStateToProps = (state: any) => ({
    lang: AppActions.get(state).lang
});

export default Team;