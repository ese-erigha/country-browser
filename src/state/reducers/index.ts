import { State } from '../../types';
import { Action, FetchCountriesAction } from '../actionTypes';
import { fetchCountries } from './fetchCountries';

export const initialState: State = {
  loading: true,
  countries: [],
};

export const initState = (state: State) => state;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_COUNTRIES':
      return fetchCountries(state, action as FetchCountriesAction);

    default:
      return { ...state };
  }
};
