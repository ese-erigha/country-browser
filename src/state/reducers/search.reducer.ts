import {
  SearchCountriesAction,
  EmptySearchQueryAction,
  FetchCountriesAction,
} from 'state/actionTypes';
import { CountryConnection, CountryListResponse, CountrySearchError, State } from 'types';

export const fetchCountriesReducer = (state: State, action: FetchCountriesAction): State => {
  const { countries } = action.payload;

  let partialState: Partial<State> = {};

  // eslint-disable-next-line no-underscore-dangle
  if (countries.__typename === 'CountrySearchError') {
    partialState = { ...partialState, error: (countries as CountrySearchError).message };
  } else {
    const { nodes, pageInfo } = countries as CountryConnection;
    const cachedCountryListResponse: CountryListResponse = {
      countries: state.cachedCountryListResponse?.countries?.concat(nodes),
      pageInfo,
    };
    partialState = {
      ...partialState,
      cachedCountryListResponse,
      countryListResponse: cachedCountryListResponse,
    };
  }

  return {
    ...state,
    ...partialState,
    loading: false,
  };
};
export const searchCountriesReducer = (state: State, action: SearchCountriesAction): State => {
  const { countries } = action.payload;

  let partialState: Partial<State> = {};

  // eslint-disable-next-line no-underscore-dangle
  if (countries.__typename === 'CountrySearchError') {
    partialState = { ...partialState, error: (countries as CountrySearchError).message };
  } else {
    const { nodes, pageInfo } = countries as CountryConnection;
    const countryListResponse: CountryListResponse = {
      countries: nodes,
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
export const emptySearchQueryReducer = (state: State, _action: EmptySearchQueryAction): State => ({
  ...state,
  countryListResponse: state.cachedCountryListResponse,
  loading: false,
});

export const fetchCountriesByRegionReducer = (
  state: State,
  action: FetchCountriesAction
): State => {
  const { countries } = action.payload;

  let partialState: Partial<State> = {};

  // eslint-disable-next-line no-underscore-dangle
  if (countries.__typename === 'CountrySearchError') {
    partialState = { ...partialState, error: (countries as CountrySearchError).message };
  } else {
    const { nodes, pageInfo } = countries as CountryConnection;
    const cachedCountryListResponse: CountryListResponse = {
      countries: state.cachedCountryListResponse?.countries?.concat(nodes),
      pageInfo,
    };
    partialState = {
      ...partialState,
      cachedCountryListResponse,
      countryListResponse: cachedCountryListResponse,
    };
  }

  return {
    ...state,
    ...partialState,
    loading: false,
  };
};
