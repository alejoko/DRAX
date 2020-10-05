import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { AppActions } from 'src/App/redux/actions';
import { ChangeLangPayload } from 'src/App/redux/actions/AppActions';

type CompanySummaryProps = RouteComponentProps<{ lang: string }> & {
    lang?: ChangeLangPayload;
};

const CompanySummary = ({ lang }: CompanySummaryProps) => {
    return (
        <>
            company summary
        </>
    )
};

const mapStateToProps = (state: any) => ({
    lang: AppActions.get(state).lang
});

export default connect(mapStateToProps)(CompanySummary);