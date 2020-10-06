import React, {useEffect, useState, ReactElement} from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

type AutocompleteTagsProps<T = any> = {
    value: T[] | undefined;
    values: T[] | (() => Promise<any>);
    placeholder: string;
    renderOption: (obj: T) => ReactElement;
    getOptionLabel: (obj: T) => string;
    getOptionSelected?: ((option: T, value: T ) => boolean) | undefined;
};

const AutocompleteTags = ({value, values, getOptionSelected, getOptionLabel, renderOption, placeholder} : AutocompleteTagsProps) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (async () => {
            const response = values instanceof Function ? await values() : values;
            if (active) {
                setOptions(response);
            }
        })();
        return () => {
            active = false;
        };
    }, [loading, values]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return <div>
        <Autocomplete
            multiple
            id="size-small-standard-multi"
            size="small"
            options={options}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            getOptionSelected={getOptionSelected}
            loading={loading}
            limitTags={3}
            getOptionLabel={getOptionLabel}
            renderOption={renderOption}
            defaultValue={value}
            renderInput={(params) => (
                <TextField {...params} variant="standard" label="Size small" placeholder={placeholder} />
            )}
        />
    </div>;
};

AutocompleteTags.propTypes = {
    value: PropTypes.array,
    getOptionLabel: PropTypes.func,
    getOptionSelected: PropTypes.func,
    renderOption: PropTypes.func,
    renderTags: PropTypes.func,
    placeholder: PropTypes.string,
    values: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func
    ]),
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.string
    ])
};

export default AutocompleteTags;