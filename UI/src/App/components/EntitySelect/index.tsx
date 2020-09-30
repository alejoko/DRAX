import React, { useMemo } from 'react';
/*import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.less';*/


/*export type EntitySelectProps<T extends SelectValue = SelectValue> = SelectProps<T> & {
    config?: {
        key: string;
        name: string;
        defaultText: string;
    }
    showDefault?: boolean;
    toUpperCase?: boolean;
    itemClassName?: string;
    filterDataSource?: (value: T, index: number, data: T[]) => boolean;
    dataSource?: any[];
}*/

function EntitySelect/*<T extends SelectValue = SelectValue>*/(/*props: EntitySelectProps<T>*/) {
    /*const {
        config, defaultValue, onChange, value,
        dataSource, showDefault, filterDataSource, itemClassName, toUpperCase = false, 
        ...rest
    } = props;
    const { key, name, defaultText } = config!;

    const loading = dataSource == null;
    const displayDefault = showDefault === false ? false : true;

    // ========================================== Event ==========================================
    const handleChange = (newValue: SelectValue, option: any) => {
        if (newValue !== value) {
            if (onChange) {
                onChange(newValue as T, option);
            }
        }
    }
    // #endregion

    // ======================================= React Cicle =======================================
    const source = useMemo(() => 
        (dataSource && filterDataSource) ? dataSource.filter(filterDataSource) : dataSource, [dataSource, filterDataSource]); 
    // #endregion

    // =========================================== Render =========================================
    return (
        <Select<T>
            value={dataSource && value}
            onChange={handleChange}
            defaultValue={defaultValue}
            notFoundContent={loading ? <Spin size="small" /> : null}
            {...rest}
            className={cx(props.className, { [styles.uppercase]: toUpperCase })}
        >
            {dataSource && displayDefault && (
                <Select.Option
                    className={itemClassName}
                    key={0}
                    value={defaultValue as any}
                >
                    <em>{defaultText}</em>
                </Select.Option>
            )}
            {source && source.map(m => (
                <Select.Option
                    className={cx({ [styles.uppercase]: toUpperCase }, itemClassName)}
                    key={m[key]}
                    value={m[key]}
                >
                    {m[name]}
                </Select.Option>
            ))}
        </Select>
    )*/
}
/*EntitySelect.defaultProps = {
    config: {
        defaultText: 'Select',
        key: 'id',
        name: 'name',
    },
    defaultValue: '', 
}
EntitySelect.propTypes = {
    config: PropTypes.shape({
        defaultText: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    showDefault: PropTypes.bool,
    toUpperCase: PropTypes.bool,
    itemClassName: PropTypes.string
};*/
export default EntitySelect;