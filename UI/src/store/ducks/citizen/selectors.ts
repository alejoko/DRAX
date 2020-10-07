import { StoreState } from '..';

export const getCitizens = (store: StoreState) => store.citizens.data.filter(citizen => citizen.name.toLowerCase().includes(store.citizens.needle.toLowerCase()));

export const getCitizenNeedle = (store: StoreState) => store.citizens.needle;

export const getCitizen = (id: string) => (store: StoreState) => store.citizens.data.find(citizen => citizen.id === Number(id));

export const getCitizenByName = (name: string) => (store: StoreState) => store.citizens.data.find(citizen => citizen.name === name);