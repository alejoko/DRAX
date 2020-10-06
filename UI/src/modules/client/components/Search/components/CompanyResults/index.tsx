import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import {
    useQuery,
    useQueryCache,
    QueryCache, 
    ReactQueryCacheProvider,
  } from "react-query";
import { List, ListRowRenderer, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";

const queryCache = useQueryCache();

export const Company: FunctionComponent<{ index: number }> = ({ index }) => {
  const companies: any[] = queryCache.getQueryData(['companies']) || [];
  const company = companies[index];

  return (
      <div className="card" key={company.id} >
        <div className="title">
          <h2>
            <Link to={`${company.id}`}>
              {company.name}
            </Link>
          </h2>
        </div>
      </div>
  );
};

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100
});

export const RowRenderer: ListRowRenderer = ({ index, parent, key, style}: any) => {
  return (
    <CellMeasurer 
      key={key}
      cache={cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
      style={style}
    >
      <div style={style}>
        <Company index={ index } />
      </div>
    </CellMeasurer>
  );
};

class AutosizerWrapper extends React.Component<{ companies: any }> {

  render() {
    return (
      <AutoSizer>
      {
        ({ width, height }: any) => {
          return <List
            rowCount={this.props.companies.length}
            width={width}
            height={height}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            rowRenderer={RowRenderer}
          />
        }
      }
      </AutoSizer>
    )
  }
}

export const CitizenList: FunctionComponent = ({ text }: any) => {
    const cache = new QueryCache()
    const { status, data, error, isFetching } = useQuery('companies', fetchCompanies(text));

    return (  
        <ReactQueryCacheProvider queryCache={cache}>
            <AutosizerWrapper companies={data} />
        </ReactQueryCacheProvider>
    )
};