import { ActionTypes, State } from 'types';
import { APP_STATE } from '../../constants';
import { Action } from '../actionTypes';
import { reducerStrategies } from './search.reducer';

// const cachedState = localStorage.getItem(APP_STATE);
// export const initialState: State = cachedState ? JSON.parse(cachedState) : { loading: true };

export const initialState: State = {
  loading: true,
  activeQuery: {
    type: ActionTypes.FETCH_ALL_COUNTRIES,
    value: { offset: 0 },
  },
};

export const initState = (state: State) => state;

export const reducer = (state: State, action: Action): State => {
  const reducerStrategy = reducerStrategies.find(({ check }) => check(state, action));
  if (!reducerStrategy) return { ...state };

  const partialState = reducerStrategy.reduce(state, action);
  const newState = {
    ...state,
    ...partialState,
    loading: false,
  };
  // const newState = searchReducer(state, action as BaseSearchAction);
  // // localStorage.setItem(APP_STATE, JSON.stringify({ ...newState }));
  return newState;
};
