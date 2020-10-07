import { ActionTypes, Action, CitizenStore } from "./types";

const initialState: CitizenStore = {
  data: [],
  needle: ''
};

export const citizensReducer = (state: CitizenStore = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FetchAllCitizens:
      return {
        ...state,
        data: action.payload
      }

    case ActionTypes.SearchCitizens:
      return {
        ...state,
        needle: action.payload
      };

    default:
      return state;
  }
};