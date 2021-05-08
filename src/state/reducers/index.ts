import { State } from '../../types';
import {
  Action,
  FetchCountriesAction,
  SearchCountriesAction,
  EmptySearchQueryAction,
  ActionTypes,
} from '../actionTypes';
import {
  fetchCountriesReducer,
  searchCountriesReducer,
  emptySearchQueryReducer,
} from './search.reducer';

export const initialState: State = {
  loading: true,
};

export const initState = (state: State) => state;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COUNTRIES:
      return fetchCountriesReducer(state, action as FetchCountriesAction);

    case ActionTypes.SEARCH_COUNTRIES:
      return searchCountriesReducer(state, action as SearchCountriesAction);

    case ActionTypes.EMPTY_SEARCH_QUERY:
      return emptySearchQueryReducer(state, action as EmptySearchQueryAction);

    default:
      return { ...state };
  }
};
