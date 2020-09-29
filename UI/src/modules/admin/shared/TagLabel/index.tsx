import React from 'react';

/*
import { TagActions } from '../../redux/actions';
import withDataFromRedux from 'src/App/hoc/withDataFromRedux';

import { Guid } from 'src/App/helpers/model';

import { ITagModel } from '../../services/config/tag.service';*/


/*export type TagLabelProps = {
    value: Guid;
    dataSource?: { [id: string]: ITagModel };
}
*/
function TagSelect(/*props: TagLabelProps*/) {
    /*const { value, dataSource } = props;

    // #region Render
    // ========================================== Render =========================================
    return (
        <span>{dataSource![value].name}</span>
    )*/
    // #endregion
}

/*
const mapStateToProps = (state: any) => ({
    dataSource: TagActions.get(state)?.cache
})
export default withDataFromRedux<TagLabelProps>(
    [{ info: TagActions.autoLoader }],
    { skeleton: { avatar: false, paragraph: false, title: true } },
    mapStateToProps
)(TagSelect);*/

export default TagSelect;