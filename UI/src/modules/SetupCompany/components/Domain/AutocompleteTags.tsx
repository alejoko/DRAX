import React, { useEffect, useState, ReactElement } from 'react';
import PropTypes from 'prop-types';

import FolderOpen from '@material-ui/icons/FolderOpen'; // TODO: to be removed
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

type AutocompleteTagsProps<T = any> = {
    value: T[] | undefined;
    values: T[] | (() => Promise<any>);
    renderOption: (obj: T) => ReactElement;
    getOptionLabel: (obj: T) => string;
    getOptionSelected: ((option: T, value: T ) => boolean) | undefined;
    // SvgIconComponent: JSX.Element; -- TODO: to be fixed
    textFieldLabel: string;
};

const AutocompleteTags = ({ value, values, getOptionSelected, getOptionLabel, renderOption, textFieldLabel  } : AutocompleteTagsProps) => {
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
                <Box display="flex">
                    <FolderOpen />
                    <TextField {...params} variant="standard" label={textFieldLabel} />
                </Box>
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