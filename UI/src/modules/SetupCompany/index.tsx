import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { Stepper, Step } from './components/Stepper';

import SetupCompanyLayout from './components/SetupCompanyLayout';
import Domain from './components/Domain';
import Team from './components/Team';

const SetupCompany = (props: RouteComponentProps) => {
    const intl = useIntl();

    return (
        <Stepper>
            <Step label={intl.formatMessage({ id: 'setup-company.domain.title'})}>
                <SetupCompanyLayout >
                    <Domain/>
                </SetupCompanyLayout>
            </Step>
            <Step label={intl.formatMessage({ id: 'setup-company.team.title'})}>
                <SetupCompanyLayout >
                    <Team/>
                </SetupCompanyLayout>
            </Step>
        </Stepper>
    )
};


export default SetupCompany;