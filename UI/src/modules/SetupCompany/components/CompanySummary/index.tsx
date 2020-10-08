import React from 'react';
import { useIntl } from 'react-intl';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import draxLogo from '../../../../assets/images/svgs/drax-logo.svg';
import CustomIcon from '../../../../App/components/CustomIcon';
import icons from '../../../../App/enums/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        summaryHeaderAvatar: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: theme.spacing(2),
            padding: theme.spacing(0, 1),
            width: 64,
            height: 64,
            boxShadow: '1px 4px 10px 0 #dee0f099',
            '& .MuiAvatar-img': {
                maxWidth: '100%',
                objectFit: 'contain'
            }
        },
        summaryHeaderName: {
            fontSize: 32,
        },
        summaryItem: {
            marginRight: theme.spacing(4),
            fontSize: 12,
            color: theme.palette.others.teal,
            fontWeight: 700,
            '&:first-child .MuiSvgIcon-root': {
                fontSize: 20,
            },
            '&:nth-child(2) .MuiSvgIcon-root': {
                fontSize: 20,
            },
        },
        summaryItemIcon: {
            color: theme.palette.others.teal,
            marginRight: theme.spacing(1/2),
        },
        summaryItemValue: {
            color: theme.palette.others.darkestColor,
            fontSize: 14,
        },
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
            <Box display='flex' alignItems='center' mb={4}>
                <Avatar className={classes.summaryHeaderAvatar} src={draxLogo} alt={companyName} />
                <Typography variant="h5" className={classes.summaryHeaderName}>
                    {companyName}
                </Typography>
            </Box>
            <Box display="flex" alignItems="baseline" mb={3}>
                <Box className={classes.summaryItem}>
                    <CustomIcon icon={icons.office} className={classes.summaryItemIcon} />
                    <Box component='span'>
                        {intl.formatMessage({ id: 'setup-company.companySummary.mainOffice' })}
                    </Box>
                    <Box className={classes.summaryItemValue}>{mainOffice}</Box>
                </Box>
                <Box className={classes.summaryItem}>
                    <CustomIcon icon={icons.users} className={classes.summaryItemIcon} />
                    <Box component='span'>
                        {intl.formatMessage({ id: 'setup-company.companySummary.employees' })}
                    </Box>
                    <Box className={classes.summaryItemValue}>{employees}</Box>
                </Box>
            </Box>
            <Box pb={2}>
                <Typography variant="body1">
                    {companyDescription}
                </Typography>
            </Box>
            <Box display='flex' justifyContent='flex-end'>
                <Link href={domain} target="_blank">
                    {intl.formatMessage({ id: 'setup-company.companySummary.website' })}
                    <CustomIcon icon={icons.chevronRight} />
                </Link>
            </Box>
        </>
    )
};

export default CompanySummary;