import { State } from '../../types';
import {
  Action,
  FetchAllCountriesAction,
  SearchCountriesAction,
  EmptySearchQueryAction,
  ActionTypes,
  SetCountriesSearchQueryAction,
  FetchCountriesByRegionAction,
} from '../actionTypes';
import {
  fetchAllCountriesReducer,
  searchCountriesReducer,
  emptySearchQueryReducer,
  fetchCountriesByRegionReducer,
} from './search.reducer';

export const initialState: State = {
  loading: true,
};

export const initState = (state: State) => state;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_COUNTRIES:
      return fetchAllCountriesReducer(state, action as FetchAllCountriesAction);

    case ActionTypes.SEARCH_COUNTRIES:
      return searchCountriesReducer(state, action as SearchCountriesAction);

    case ActionTypes.FETCH_COUNTRIES_BY_REGION_QUERY:
      return fetchCountriesByRegionReducer(state, action as FetchCountriesByRegionAction);

    case ActionTypes.EMPTY_SEARCH_QUERY:
      return emptySearchQueryReducer(state, action as EmptySearchQueryAction);

    case ActionTypes.SET_COUNTRIES_SEARCH_QUERY:
      return {
        ...state,
        loading: true,
        searchQueryInput: (action as SetCountriesSearchQueryAction).payload,
      };

    default:
      return { ...state };
  }
};
