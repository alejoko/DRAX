import React, { ReactElement, useEffect } from 'react';
import { RouteComponentProps, useParams, useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { useXhrClient } from 'src/App/hooks/XhrProvider';
import { CompanyActions } from '../../redux/actions'; // CompanyStore

import CompanySummary from '../CompanySummary';

type SetupCompanyLayoutProps = {
    children?: ReactElement | null;
};

const SetupCompanyLayout = (props: SetupCompanyLayoutProps) => {

    // const { companyId } = useParams();
    const companyId = '29218';
    // const client = useXhrClient();
    // const dispatch = useDispatch();

    // console.log('Estado que retorna ', state);

    // useEffect(() => { dispatch(CompanyActions.fetchCompanyById(client, companyId)); }, [companyId, dispatch]);


    return (
        <Grid container >
            <Box display="flex">
                <Box order={1} width={1/3} p={2}>
                    <CompanySummary />
                </Box>
                <Divider style={{order: 2}} orientation="vertical" flexItem />
                <Box order={3} width={2/3} p={2}>
                    {props.children}
                </Box>
            </Box>
        </Grid>
    )
};

export default SetupCompanyLayout;