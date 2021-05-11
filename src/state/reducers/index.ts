import { State } from 'types';
import {
  Action,
  ActionTypes,
  BaseSearchAction,
  SetCountriesSearchQueryAction,
} from '../actionTypes';
import { searchReducer } from './search.reducer';

export const initialState: State = {
  loading: true,
};

export const initState = (state: State) => state;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_COUNTRIES_SEARCH_QUERY:
      return {
        ...state,
        loading: true,
        searchQueryInput: (action as SetCountriesSearchQueryAction).payload,
      };

    default:
      return searchReducer(state, action as BaseSearchAction);
  }
};
