import React from 'react';
import { useIntl } from 'react-intl';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import FolderOpen from '@material-ui/icons/FolderOpen';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inlineBlock: {
            display: 'inline-block',
            verticalAlign: 'middle'
        }
    }),
);

//TODO : get from API
const companyInfo = {
    companyName: 'Drax Group',
    companyDescription : "Drax Group PLC is an electric utility company that produces energy for large customers and businesses in the United Kingdom. Drax generates thermal energy through the use of coal and biomass fuel sources. The majority of the power that the company produces comes from coal fuel sources. The rest comes from the burning of compressed wood pellets, or biomass, sourced from forests in the American South. Drax primarily brings in revenue through the sale of power. The sale of United Kingdom renewable certificates also represents a significant revenue stream. The company is one of the U.K. 's largest producers of renewable power and controls Europe's single largest decarburization project by way of its biomass facilities.",
    domain : 'http://www.drax.com',
    mainOffice : 'United Kingdom',
    employees: 666
};

const CompanySummary = () => {
    const classes = useStyles();
    const intl = useIntl();
    const { companyName, mainOffice, employees, companyDescription, domain  } = companyInfo;

    return (
        <>
        <Box pb={1}>
            <Typography variant="h5"><Avatar className={classes.inlineBlock} /> {companyName}</Typography>
        </Box>
        <Box display="flex">
            <Box order={1}>
                <FolderOpen /><span>{intl.formatMessage({ id: 'setup-company.companySummary.mainOffice' })}</span>
                <br />
                <div>{mainOffice}</div>
            </Box>
            <Box order={2} pl={1}>
                <FolderOpen /><span>{intl.formatMessage({ id: 'setup-company.companySummary.employees' })}</span>
                <br />
                <div>{employees}</div>
            </Box>
        </Box>
        <Box pt={2} pb={2}>
            <Typography variant="caption">
                {companyDescription}
            </Typography>
        </Box>
        <div>
            <Link href={domain} target="_blank">
                {intl.formatMessage({ id: 'setup-company.companySummary.website' })}
            </Link>
            </div>
        </>
    )
};

export default CompanySummary;