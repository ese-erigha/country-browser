import { createContext, Dispatch } from 'react';
import { State } from '../types';
import { Action, initialState } from './reducer';

export const AppContext = createContext<{ state: State; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});
