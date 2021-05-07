import React, { ReactNode, Reducer, useReducer } from 'react';
import { Action } from 'state/actionTypes';
import { initialState, initState, reducer } from 'state/reducers';
import { AppContext } from 'state/context';
import { State } from './types';

type Props = {
  children: ReactNode;
};

const AppContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>, State>(
    reducer,
    initialState,
    initState
  );
  return <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
