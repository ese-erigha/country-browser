import { State } from 'types';
import { APP_STATE } from '../../constants';
import {
  Action,
  ActionTypes,
  BaseSearchAction,
  SetCountriesSearchQueryAction,
} from '../actionTypes';
import { searchReducer } from './search.reducer';

const cachedState = localStorage.getItem(APP_STATE);
export const initialState: State = cachedState ? JSON.parse(cachedState) : { loading: true };

export const initState = (state: State) => state;

export const reducer = (state: State, action: Action): State => {
  let newState = { ...state };

  switch (action.type) {
    case ActionTypes.SET_COUNTRIES_SEARCH_QUERY:
      newState = {
        ...state,
        loading: true,
        searchQuery: (action as SetCountriesSearchQueryAction).payload,
      };
      break;

    default:
      newState = searchReducer(state, action as BaseSearchAction);
      break;
  }

  localStorage.setItem(APP_STATE, JSON.stringify({ ...newState }));

  return newState;
};
