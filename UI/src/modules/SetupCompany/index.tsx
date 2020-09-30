import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { Stepper, Step } from './components/Stepper';
import SetDomain from './components/SetDomain';
import SetTeam from './components/SetTeam';

import { AppActions } from 'src/App/redux/actions';
import { ChangeLangPayload } from 'src/App/redux/actions/AppActions';

export type SetupCompanyProps = RouteComponentProps<{ lang: string }> & {
    lang?: ChangeLangPayload;
};

const SetupCompany = (props: SetupCompanyProps) => {
    return (
        <Stepper>
            <Step label="One">
                <SetDomain {...props}/>
            </Step>
            <Step label="Two">
                <SetTeam {...props}/>
            </Step>
        </Stepper>
    )
};

const mapStateToProps = (state: any) => ({
    lang: AppActions.get(state).lang
});

export default connect(mapStateToProps)(SetupCompany);