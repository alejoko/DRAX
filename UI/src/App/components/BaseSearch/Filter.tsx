import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';

/*type FilterProps<T> = {
    defaultValue?: T;
    onChange: (value?: T) => void;
    component: React.ComponentType;
    componentProps?: any;
    btnProps?: ButtonProps;
    primaryBtnProps?: ButtonProps;
    transformInnerValue?: (value: any) => T;
    filterDropdownProps?: FilterDropdownProps;
};*/

// tslint:disable-next-line: variable-name
function Filter<T = any>(/*props: FilterProps<T>*/) {
    /*
    const { defaultValue, onChange, component, componentProps, transformInnerValue, filterDropdownProps, primaryBtnProps, btnProps } = props;

    const [innerValue, setInnerValue] = React.useState<any>(defaultValue);

    const { confirm, clearFilters, setSelectedKeys } = filterDropdownProps || {};


    // #region Event
    // ========================================== Event ==========================================
    function handleReset() {
        if (clearFilters) {
            clearFilters();
        }
        setInnerValue(defaultValue);
        onChange(defaultValue);
    }
    function handleSearch() {
        if (confirm) {
            confirm();
        }
        onChange(innerValue)
    };
    function handleChange(v: any) {
        const value = transformInnerValue ? transformInnerValue(v) : v;

        if (setSelectedKeys) {
            const keys: any = Array.isArray(value) ? value : [value];
            setSelectedKeys(keys);
        }

        setInnerValue(value);
    }
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    // tslint:disable-next-line: variable-name
    const Render: any = component;
    return (
        <div className={styles.container}>
            <div className={styles.children}>
                <Render {...componentProps} value={innerValue} onChange={handleChange} />
            </div>
            <Row gutter={16}>
                <Col span={12}>
                    <Button
                        {...primaryBtnProps}
                        className="full-width"
                        type="primary"
                        onClick={handleSearch}
                        icon={<SearchOutlined />}
                        disabled={defaultValue === innerValue}
                    >
                        Search
                    </Button>
                </Col>
                <Col span={12}>
                    <Button
                        {...btnProps}
                        className="full-width"
                        disabled={defaultValue === innerValue}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Col>
            </Row>
        </div>
    )*/
    // #endregion
}
/*Filter.primaryBtnProps = {
    size: 'small',
    type: "primary",
    icon: <SearchOutlined />,
} as ButtonProps
Filter.btnProps = {
    size: 'small'
} as ButtonProps
Filter.reactEventTransform = function<T>(e: ChangeEvent): T {
    return (e.target as any).value;
}

Filter.defaultProps = {
    btnProps: Filter.btnProps,
    primaryBtnProps: Filter.primaryBtnProps
}
Filter.propTypes = {
    onChange: PropTypes.func.isRequired
}*/
export default Filter;
