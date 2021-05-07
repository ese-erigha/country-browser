import { createContext, Dispatch } from 'react';
import { State } from '../types';
import { Action } from './actionTypes';
import { initialState } from './reducers';

export const AppContext = createContext<{ state: State; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});
