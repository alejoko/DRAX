import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AutocompleteTags from './AutocompleteTags';
import {values, currentValue, asyncValues} from './fixtures';


import { AppActions } from 'src/App/redux/actions';
import { ChangeLangPayload } from 'src/App/redux/actions/AppActions';

type DomainProps = RouteComponentProps<{ lang: string }> & {
    lang?: ChangeLangPayload;
};
// Adapt the value shown within the list of elements
const getOptionLabel = (option: any) => option.value;

const getOptionSelected = (option: any, value: any) => option.key === value.key;

const OptionRenderer = ({key, value} : any) => { return <div><strong>{key}</strong> {value}</div>; };

const Domain = ({ lang }: DomainProps) => {
    return (
        <>
        modulo domain
        <AutocompleteTags
            value={currentValue}
            values={values}
            placeholder="Add a new film"
            renderOption={OptionRenderer}
            getOptionLabel={getOptionLabel}
        />
        <hr />
        {/* Async example */}
        <AutocompleteTags
            value={currentValue}
            values={asyncValues}
            placeholder="Add a new film"
            renderOption={OptionRenderer}
            getOptionLabel={getOptionLabel}
            getOptionSelected={getOptionSelected}
        />
        </>
    )
};

const mapStateToProps = (state: any) => ({
    lang: AppActions.get(state).lang
});

export default connect(mapStateToProps)(Domain);