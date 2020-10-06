import React from 'react';
import AutocompleteTags from './AutocompleteTags';

const getOptionLabel = (option: any) => option.value;
const getOptionSelected = (option: any, value: any) => option.key === value.key;
const OptionRenderer = ({key, value} : any) => { return <div><strong>{key}</strong> {value}</div>; };

type AutocompleteTagsLayoutProps<T = any> = {
    value: T[] | undefined;
    values: T[] | (() => Promise<any>);
    //SvgIconComponent: JSX.Element; // TODO: to be fixed
    textFieldLabel: JSX.Element | string;
};

const AutocompleteTagsLayout = (props : AutocompleteTagsLayoutProps) => {
    return (
        <>
            <AutocompleteTags
                {...props}
                renderOption={OptionRenderer}
                getOptionLabel={getOptionLabel}
                getOptionSelected={getOptionSelected}
            />
        </>
    )
};

export default AutocompleteTagsLayout;