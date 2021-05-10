import {
  SearchCountriesAction,
  EmptySearchQueryAction,
  FetchAllCountriesAction,
} from 'state/actionTypes';
import { CountryConnection, CountryListResponse, CountrySearchError, State } from 'types';

export type ReducerStrategy = {
  check: () => boolean;
};
export const reducerStrategy = () => {};

export const fetchAllCountriesReducer = (state: State, action: FetchAllCountriesAction): State => {
  const { countries } = action.payload;

  let partialState: Partial<State> = {};

  // eslint-disable-next-line no-underscore-dangle
  if (countries.__typename === 'CountrySearchError') {
    partialState = { ...partialState, error: (countries as CountrySearchError).message };
  } else {
    const { nodes, pageInfo } = countries as CountryConnection;
    const countryList = state.cache?.countryListResponse?.countries ?? [];
    const cache = {
      countryListResponse: {
        countries: countryList.concat(nodes),
        pageInfo,
      },
      searchQuery: state.searchQuery,
    };

    partialState = {
      ...partialState,
      cache,
      countryListResponse: state.cache?.countryListResponse,
    };
  }

  return {
    ...state,
    ...partialState,
    loading: false,
  };
};
export const emptySearchQueryReducer = (state: State, _action: EmptySearchQueryAction): State => ({
  ...state,
  countryListResponse: state.cache?.countryListResponse,
  searchQuery: state.cache?.searchQuery,
  loading: false,
});
export const searchCountriesReducer = (state: State, action: SearchCountriesAction): State => {
  const { countries } = action.payload;

  let partialState: Partial<State> = {};

  // eslint-disable-next-line no-underscore-dangle
  if (countries.__typename === 'CountrySearchError') {
    partialState = { ...partialState, error: (countries as CountrySearchError).message };
  } else {
    const { nodes, pageInfo } = countries as CountryConnection;
    const offset = state.searchQuery?.query?.offset ?? 0;
    const countryListResponse: CountryListResponse = {
      countries: offset < 1 ? nodes : (state.countryListResponse?.countries ?? []).concat(nodes),
      pageInfo,
    };
    partialState = {
      ...partialState,
      countryListResponse,
    };
  }

  return {
    ...state,
    ...partialState,
    loading: false,
  };
};

export const fetchCountriesByRegionReducer = (
  state: State,
  action: FetchAllCountriesAction
): State => {
  const { countries } = action.payload;

  let partialState: Partial<State> = {};

  // eslint-disable-next-line no-underscore-dangle
  if (countries.__typename === 'CountrySearchError') {
    partialState = { ...partialState, error: (countries as CountrySearchError).message };
  } else {
    const { nodes, pageInfo } = countries as CountryConnection;
    const offset = state.searchQuery?.query?.offset ?? 0;
    const countryListResponse: CountryListResponse = {
      countries: offset < 1 ? nodes : (state.countryListResponse?.countries ?? []).concat(nodes),
      pageInfo,
    };
    partialState = {
      ...partialState,
      countryListResponse,
      searchQuery: state.cache?.searchQuery,
    };
  }

  return {
    ...state,
    ...partialState,
    loading: false,
  };
};
