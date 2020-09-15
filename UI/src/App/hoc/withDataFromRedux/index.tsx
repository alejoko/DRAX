import React from 'react';
import { Dispatch } from 'redux';
import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux';

import { Spin, Skeleton } from 'antd';
import { SpinSize } from 'antd/lib/spin';
import { AvatarProps } from 'antd/lib/skeleton/Avatar';
import { SkeletonTitleProps } from 'antd/lib/skeleton/Title';
import { SkeletonParagraphProps } from 'antd/lib/skeleton/Paragraph';

import { useXhrClient } from 'src/App/hooks/XhrProvider';

import { EntityBucket } from 'src/App/helpers/redux';



export type LoaderFunc = (...arg: any[]) => ThunkFunc;
export type ThunkFunc = (dispatch: Dispatch, getState: () => any) => Promise<any>;

/** Indicate client to use. */
export enum ClientType {
    Xhr = 1,
    GraphQLAsXhr = 2,
    GraphQL = 3
}
/** Information used to load data and store in Redux. */
export type LoaderInfo<T = any> = {
    /** EntityName used to store the value in redux global store. */
    store: string;
    /** Funtion to retrieve data from redux store. */
    get: (state: any) => EntityBucket<T>;
    /** Function caller to load data and set values in redux storage. */
    loader: LoaderFunc;
}
export type WaitSettings = {
    sping?: SpinSize;
    skeleton?: {
        avatar?: AvatarProps | boolean,
        title?: SkeletonTitleProps | boolean,
        paragraph?: SkeletonParagraphProps | boolean,
    },
    component?: JSX.Element;
}

/**
 * 
 * @param items 
 * @param data 
 * @param setData 
 */
function _checkIfFullLoad(items: any[], data: any, setData: (data: any) => void) {
    if (!data) {
        let isFullLoad = true;
        items.forEach(item => {
            if (!item.entity) {
                isFullLoad = false;
            }
        });
        if (isFullLoad) {
            const aux: any = {};
            items.forEach(item => aux[item.store] = item.entity);

            setData(aux);
        }
    }
}
/**
 * 
 * @param loaders Array of all autoloader to be used.
 * @param wait 
 * @param mapStateToProps 
 * @param mapDispatchToProps 
 * @param type Type of cliente supplied as argument in loader function.
 */
function withDataFromRedux<T>(
    loaders: Array<{ info: LoaderInfo, getArgs?: (state: any, props: any) => any }>,
    wait?: WaitSettings | boolean,
    mapStateToProps?: MapStateToPropsParam<any, T>,
    mapDispatchToProps?: MapDispatchToPropsParam<any, T>,
    type: ClientType = ClientType.Xhr,
) {
    type ItemInfo = {
        /** Argument passed to the retrieve data from endpoint. */
        args: any[];
        /** Entity data resulting from redux. */
        entity: EntityBucket;
        /** EntityName used to store the value in redux global store. */
        store: string;
        /** Function caller to load data and set values in redux storage. */
        loader: LoaderFunc;
    };

    switch (type) {
        case ClientType.Xhr:            // Use XhrClient to resolve entity (create multiples request)
        case ClientType.GraphQLAsXhr:   // Use GrapQLClient to resolve entity (create multiples request).
            return function (Render: React.ComponentType<T>): React.ComponentType<T> {
                type WithReduxComponentProps = T & {
                    $__items: ItemInfo[];
                    $__loader: (loader: LoaderFunc, args: any[]) => void;
                }

                /** Component to wrap functionality */
                function WithDataFromRedux(props: WithReduxComponentProps) {
                    const { $__items, $__loader, ...rest } = props;

                    const [data, setData] = React.useState<any>();
                    const client = useXhrClient();
                    // const client = useApolloClient();
                    // const client = type == ClientType.Xhr ? useXhrClient() : useApolloClient();

                    // #region React Cicle
                    // ======================================= React Cicle =======================================
                    React.useEffect(() => {
                        $__items.forEach((item: ItemInfo) => {
                            if (!item.entity) {
                                $__loader(item.loader, item.args ? [client, ...item.args] : [client]);
                            }
                        });
                        // eslint-disable-next-line
                    }, []);
                    React.useEffect(() => {
                        _checkIfFullLoad($__items, data, setData);
                        // eslint-disable-next-line
                    }, [$__items]);
                    // #endregion

                    // #region Render
                    // ========================================== Render =========================================
                    if (!data && wait) {
                        if (wait === true) {
                            return <Spin size="default" />
                        }
                        if (wait.component) {
                            return wait.component;
                        }
                        if (wait.skeleton) {
                            return (
                                <Skeleton active={true} loading={true} {...wait.skeleton} />
                            );
                        }
                        return <Spin size={wait.sping || 'default'} />
                    }

                    const restProps: T = rest as any;
                    return (
                        <Render {...restProps} />
                    )
                    // #endregion
                }

                /** convert all supplied loader into item information */
                const innerMapStateToProps = (state: any, props: any) => {
                    const result = mapStateToProps ? mapStateToProps(state, props) : {};
                    result.$__items = loaders.map(p => {
                        return {
                            args: p.getArgs && p.getArgs(state, props),
                            entity: p.info.get(state),
                            loader: p.info.loader,
                            store: p.info.store,
                        } as ItemInfo
                    });
                    return result;
                }
                const innerMapDispatchToProps = (dispatch: Dispatch, props: any) => {
                    const result: any = mapDispatchToProps ? mapDispatchToProps(dispatch, props) : {};
                    result.$__loader = (loaderFunc: LoaderFunc, args: any[]) => {
                        const thunkFunct: any = loaderFunc(...args);
                        dispatch(thunkFunct);
                    }

                    return result;
                }

                return connect(innerMapStateToProps, innerMapDispatchToProps)(WithDataFromRedux);
            }
        case ClientType.GraphQL:
            throw Error('Not supported');
    }
}

export default withDataFromRedux;