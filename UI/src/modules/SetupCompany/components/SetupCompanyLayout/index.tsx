import React, { ReactElement, useEffect } from 'react';
import { RouteComponentProps, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { useXhrClient } from 'src/App/hooks/XhrProvider';
import { CompanyActions } from '../../redux/actions'; // CompanyStore

import CompanySummary from '../CompanySummary';

type SetupCompanyLayoutProps = {
    children?: ReactElement | null;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            borderRight: `4px solid ${theme.palette.others.fauxWater}`
        }
    }),
);


const SetupCompanyLayout = (props: SetupCompanyLayoutProps) => {
    const classes = useStyles();

    // const { companyId } = useParams();
    const companyId = '29218';
    // const client = useXhrClient();
    // const dispatch = useDispatch();

    // console.log('Estado que retorna ', state);

    // useEffect(() => { dispatch(CompanyActions.fetchCompanyById(client, companyId)); }, [companyId, dispatch]);


    return (
        <Grid container >
            <Box display="flex">
                <Box width={1/3} p={4} pr={10}>
                    <CompanySummary />
                </Box>
                <Divider className={classes.divider} orientation="vertical" flexItem />
                <Box width={2/3} p={2}>
                    {props.children}
                </Box>
            </Box>
        </Grid>
    )
};

export default SetupCompanyLayout;