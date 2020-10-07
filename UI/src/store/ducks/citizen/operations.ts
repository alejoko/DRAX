import { fetchAllCitizensAction, searchCitizensAction } from './actions'

export const fetchAllCitizens = () => fetchAllCitizensAction();

export const searchCitizen = (needle: string) => searchCitizensAction(needle);