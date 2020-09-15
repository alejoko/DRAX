import React from 'react'
import PropTypes from 'prop-types'
import { Observable, Subject } from 'rxjs';

import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';

import Search, { SearchComponentProps } from './Search';

import { SearchPipeResponse } from '../../helpers/observable';
import { INameColumn, ISearchRequest } from 'src/App/helpers/model';



// #region Private
// ========================================= Private =========================================
function TableRender<T = any>(props: SearchComponentProps & TableProps<T> & { onSortChange: () => void }) {
    const { dataSource, loading, page, pageSize, total, emptyMessage, onPageChage, onSortChange, ...rest } = props;

    return (
        <Table<any>
            {...rest}
            loading={loading}
            pagination={
                total > pageSize ? ({
                    current: page,
                    pageSize,
                    onChange: onPageChage,
                    total
                }) : false
            }
            dataSource={dataSource}
            onChange={onSortChange}
        />
    )
}
// #endregion

type SearchWithTableProps<T> = TableProps<T> & {
    filter?: any;
    include?: string[];
    buildPipeVersion?: number;
    defaultColumnOrder?: INameColumn;
    /** This function is called to build the pipe to get data */
    buildPipe: ($subject: Subject<ISearchRequest>) => Observable<SearchPipeResponse<any, any>>;
    defaultPage?: number;
    defaultPageSize?: number;
}
function SearchWithTable<T = any>(props: SearchWithTableProps<T>) {
    const { filter, include, defaultColumnOrder, buildPipe, defaultPage, defaultPageSize, buildPipeVersion, ...rest } = props;

    const [order, setOrder] = React.useState<INameColumn | undefined>(defaultColumnOrder);

    // #region Event
    // ========================================== Event ==========================================
    function handleChange(_p: TablePaginationConfig, _f: any, sorter: SorterResult<T>) {
        if (sorter.columnKey) {
            const isAsc = sorter.order !== 'descend';
            if (!order || order.ascendant !== isAsc || order.name !== sorter.columnKey) {
                setOrder({
                    ascendant: isAsc,
                    name: sorter.columnKey as string,
                })
            };
        } else if (order) {
            setOrder(undefined);
        }
    }
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    return (
        <Search
            buildPipe={buildPipe}
            buildPipeVersion={buildPipeVersion!}
            defaultPage={defaultPage}
            defaultPageSize={defaultPageSize}
            filter={filter}
            include={include}
            order={order}
            searchComponent={TableRender as any}
            searchComponentProps={{ onSortChange: handleChange, ...rest }}
        />
    )
    // #endregion
}
SearchWithTable.defaultProps = {
    buildPipeVersion: 0
}
SearchWithTable.propTypes = {
    buildPipe: PropTypes.func.isRequired
}
export default SearchWithTable;
