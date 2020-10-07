
export interface FetchAllCitizens {
    type: ActionTypes.FetchAllCitizens;
    payload: BrastlewarkCitizen[];
}

export interface SearchCitizens {
    type: ActionTypes.SearchCitizens;
    payload: string;
}

export enum ActionTypes {
    FetchAllCitizens,
    SearchCitizens,
};

export type Action =
| FetchAllCitizens
| SearchCitizens;

export interface BrastlewarkCitizen {
    id: number;
    name: string;
    thumbnail: string;
    age: number;
    weight: number;
    height: number;
    hair_color: number;
    professions: string[];
    friends: string[];
}

export interface CitizenStore {
    data: BrastlewarkCitizen[];
    needle: string;
}