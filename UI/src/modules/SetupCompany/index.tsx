import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { Stepper, Step } from './components/Stepper';

import SetupCompanyLayout from './components/SetupCompanyLayout';
import Domain from './components/Domain';
import Team from './components/Team';

import { AppActions } from 'src/App/redux/actions';
import { ChangeLangPayload } from 'src/App/redux/actions/AppActions';

type SetupCompanyProps = RouteComponentProps<{ lang: string }> & {
    lang?: ChangeLangPayload;
};

const SetupCompany = (props: SetupCompanyProps) => {
    const intl = useIntl();

    return (
        <Stepper>
            <Step label={intl.formatMessage({ id: 'setup-company.domain.title'})}>
                <SetupCompanyLayout {...props}>
                    <Domain {...props}/>
                </SetupCompanyLayout>
            </Step>
            <Step label={intl.formatMessage({ id: 'setup-company.team.title'})}>
                <SetupCompanyLayout {...props}>
                    <Team {...props}/>
                </SetupCompanyLayout>
            </Step>
        </Stepper>
    )
};

const mapStateToProps = (state: any) => ({
    lang: AppActions.get(state).lang
});

export default connect(mapStateToProps)(SetupCompany);