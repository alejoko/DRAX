import React from 'react';
import { useIntl } from 'react-intl';
import { useParams, RouteComponentProps } from 'react-router-dom';

import AutocompleteTagsLayout from './AutocompleteTagsLayout';
import Box from '@material-ui/core/Box';
import FolderOpen from '@material-ui/icons/FolderOpen';

//TODO: to get from API.
import {values, currentValue, asyncValues} from './fixtures';

/*
type TParams = { companyId: string };

export type DomainProps = RouteComponentProps<{ companyId: string }> & {
    companyId?: string;
};*/

const Domain = () => {
    const intl = useIntl();

    // const { companyId } = useParams(); //TODO: to-be fixed
    // console.log('1companyId ', companyId);

    return (
        <>
            <Box display="flex">
                <FolderOpen /><div>{intl.formatMessage({ id: 'setup-company.domain.refineDomain' })}</div>
            </Box>

            <AutocompleteTagsLayout
                value={currentValue}
                values={values}
                textFieldLabel={intl.formatMessage({ id: 'setup-company.domain.sector' })}
            />
            <AutocompleteTagsLayout
                value={currentValue}
                values={asyncValues}
                textFieldLabel={intl.formatMessage({ id: 'setup-company.domain.products' })}
            />
            <AutocompleteTagsLayout
                value={currentValue}
                values={values}
                textFieldLabel={intl.formatMessage({ id: 'setup-company.domain.peers' })}
            />
        </>
    )
};

export default Domain;