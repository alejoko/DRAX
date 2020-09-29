import React from 'react';

/*
import EntitySelect, { EntitySelectProps } from 'src/App/components/EntitySelect';

import { TagActions } from '../../redux/actions';
import withDataFromRedux from 'src/App/hoc/withDataFromRedux';*/


// export type TagSelectProps<T extends SelectValue = SelectValue> = EntitySelectProps<T>;
function TagSelect /*<T extends SelectValue = SelectValue>*/(/*props: TagSelectProps<T>*/) {
    /*const Render: React.ComponentType<TagSelectProps<T>> = EntitySelect as any;

    return (
        <Render {...props} />
    )*/
}

/* TagSelect.defaultProps = {
    className: 'full-width'
}

const mapStateToProps = (state: any) => ({
    dataSource: TagActions.get(state)?.data
})
export default withDataFromRedux<TagSelectProps>(
    [{ info: TagActions.autoLoader }],
    { skeleton: { avatar: false, paragraph: false, title: true } },
    mapStateToProps
)(TagSelect);*/

export default TagSelect;