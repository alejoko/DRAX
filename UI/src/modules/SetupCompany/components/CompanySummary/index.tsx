import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import FolderOpen from '@material-ui/icons/FolderOpen';

import { AppActions } from 'src/App/redux/actions';
import { ChangeLangPayload } from 'src/App/redux/actions/AppActions';

type CompanySummaryProps = RouteComponentProps<{ lang: string }> & {
    lang?: ChangeLangPayload;
};

const companyInfo = {
    companyId = '29218',
    companyName = 'Drax Group',
    companyDescription= 'Drax Group PLC is an electric utility company that produces energy for large customers and businesses in the United Kingdom. Drax generates thermal energy through the use of coal and biomass fuel sources. The majority of the power that the company produces comes from coal fuel sources. The rest comes from the burning of compressed wood pellets, or biomass, sourced from forests in the American South. Drax primarily brings in revenue through the sale of power. The sale of United Kingdom renewable certificates also represents a significant revenue stream. The company is one of the U.K. 's largest producers of renewable power and controls Europe's single largest decarburization project by way of its biomass facilities.',
    companyIcon = FolderOpen,
    domain = 'drax.com',
    mainOffice = 'United Kingdom',
    employees: 666
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