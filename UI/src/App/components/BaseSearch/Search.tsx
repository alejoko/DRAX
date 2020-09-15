import React from 'react';
import PropTypes from 'prop-types';

import { Observable, Subject, Subscription } from 'rxjs';

import { SearchPipeResponse } from '../../helpers/observable';
import { INameColumn, ISearchRequest } from 'src/App/helpers/model';



type SearchPrivData = {
    $subject: Subject<ISearchRequest>;
    subscriptions: Subscription[];
}

export type SearchComponentProps = {
    dataSource: any[];
    loading: boolean;
    page: number;
    pageSize: number;
    total: number;
    emptyMessage?: string;
    onPageChage: (page: number, pageSize?: number) => void;
}

export type SearchProps = {
    filter?: any;
    include?: string[];
    order?: INameColumn;
    searchComponent: React.ComponentType<SearchComponentProps>;
    searchComponentProps?: any;
    /** This function is called to build the pipe to get data */
    buildPipe: ($subject: Subject<ISearchRequest>) => Observable<SearchPipeResponse<any, any>>;
    buildPipeVersion: number;
    defaultPage?: number;
    defaultPageSize?: number;
}
// tslint:disable-next-line: variable-name
const Search: React.FC<SearchProps> = (props: SearchProps) => {
    const { buildPipe, filter, include, order, defaultPage, defaultPageSize, searchComponent, searchComponentProps, buildPipeVersion } = props;

    const [privData] = React.useState<SearchPrivData>({ $subject: new Subject<ISearchRequest>(), subscriptions: [], });

    const [total, setTotal] = React.useState(0);
    const [data, setData] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [pagging, setPagging] = React.useState({ page: defaultPage as number, size: defaultPageSize as number });


    // #region Private
    // ========================================= Private =========================================
    function nextSubjectTerm(currPage?: number, currSize?: number) {
        const model: ISearchRequest = {
            filter,
            include,
            order: order && [order],
            pagging: {
                page: currPage !== undefined ? currPage : pagging.page,
                pageSize: currSize !== undefined ? currSize : pagging.size
            }
        }

        setLoading(true);
        setPagging({ page: model!.pagging!.page, size: model!.pagging!.pageSize });
        privData.$subject.next(model);
    }
    // #endregion

    // ========================================== Event ==========================================
    const handleChangePage = (newPage: number, newSize?: number) => nextSubjectTerm(newPage, newSize || pagging.size);
    // #endregion

    // #region React Cicle
    // ======================================= React Cicle =======================================
    React.useEffect(() => {
        const subcription = buildPipe(privData.$subject).subscribe(resp => {
            if (!resp.err && resp.resp) {
                setData(resp.resp.data)
                setTotal(resp.resp.total);

                // setLoading(false);
            } else {
                throw new Error(resp.axiosErr.message);
            }
            setLoading(false);
        });
        privData.subscriptions.push(subcription);
        nextSubjectTerm(pagging.page, pagging.size);        // subject next term

        // Unmount
        return () => {
            privData.subscriptions.forEach(sub => sub.unsubscribe());
        };
        // eslint-disable-next-line
    }, [buildPipeVersion]);
    // eslint-disable-next-line
    React.useEffect(() => { nextSubjectTerm(); }, [order]);
    // eslint-disable-next-line
    React.useEffect(() => { nextSubjectTerm(defaultPage); }, Object.values(filter));
    // #endregion

    // #region Render
    // ========================================== Render =========================================
    const { size, page } = pagging;
    // tslint:disable-next-line: variable-name
    const Render = searchComponent;
    return (
        <Render
            {...searchComponentProps}
            dataSource={data}
            loading={loading}
            page={page}
            pageSize={size}
            total={total}
            onPageChage={handleChangePage}
        />
    )
    // #endregion
}
Search.defaultProps = {
    defaultPage: 1,
    defaultPageSize: 10,
}
Search.propTypes = {
    buildPipe: PropTypes.func.isRequired,
    filter: PropTypes.object,
} as any;
export default Search;
