import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, FetchAllCitizens } from './types';

const corsProxyUrl = 'https://raw.githubusercontent.com/rrafols/mobile_test/master';

export const fetchAllCitizensAction = () => {
  const url = "data.json";
  return async (dispatch: Dispatch) => {
    const res = await axios.get(`${corsProxyUrl}/${url}`);
    dispatch<FetchAllCitizens>({
      type: ActionTypes.FetchAllCitizens,
      payload: res.data.Brastlewark,
    });
  };
};

export const searchCitizensAction = (needle: string) => ({
  type: ActionTypes.SearchCitizens,
  payload: needle,
})