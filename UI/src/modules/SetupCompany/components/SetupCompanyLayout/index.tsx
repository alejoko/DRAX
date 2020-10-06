import React, { ReactElement, useEffect } from 'react';
import { RouteComponentProps, useParams, useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { useXhrClient } from 'src/App/hooks/XhrProvider';
import { AppActions } from 'src/App/redux/actions';
import { CompanyActions, CompanyStore } from '../../redux/actions';

import { ChangeLangPayload } from 'src/App/redux/actions/AppActions';

import CompanySummary from '../CompanySummary';

type SetupCompanyLayoutProps = RouteComponentProps<{ lang: string }> & {
    lang?: ChangeLangPayload;
    children?: ReactElement | null;
};

const SetupCompanyLayout = (props: SetupCompanyLayoutProps) => {

    // const { companyId } = useParams();
    const companyId = '29218';
    // const client = useXhrClient();
    // const dispatch = useDispatch();
    // const state = useSelector((state : any) => state?.stCompany?.data[0]);
    debugger;
    // console.log('Estado que retorna ', state);

    // useEffect(() => { dispatch(CompanyActions.fetchCompanyById(client, companyId)); }, [companyId, dispatch]);


    return (
        <Grid container >
            <aside>
                <CompanySummary {...props} />
            </aside>
            <Divider orientation="vertical" flexItem/>
            <main>
                {props.children}
            </main>
        </Grid>
    )
};

export default SetupCompanyLayout;