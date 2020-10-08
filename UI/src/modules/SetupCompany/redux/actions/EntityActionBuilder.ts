import { Dispatch } from 'redux';
import { XhrClient } from 'src/App/services/xhr';
import {StdAction, entitySafeLoad, EntityPayload} from "../../../../App/helpers/redux";

import { nameof } from 'src/App/helpers/string';

type EntityActionBuilderProps<T = any> = {
    storeNS: string;
    actionType: (payload: EntityPayload<any>) => StdAction<EntityPayload<any>>,
    service: (client: XhrClient, id: string)   => any;
}

const EntityActionBuilder = ({storeNS, actionType, service} : EntityActionBuilderProps) =>  {
    abstract class EntityActions {
        public static get store() {
            return storeNS;
        }
        public static fetch = (client: XhrClient, id: string) =>
            async (dispatch: Dispatch, getState: () => any) => entitySafeLoad<any>(
                dispatch,
                getState,
                storeNS,
                () => service(client, id),
                actionType,
                nameof<any>('id')
            );
    }
    return EntityActions;
};

export default EntityActionBuilder;