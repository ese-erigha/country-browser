import {
  SearchCountriesAction,
  EmptySearchQueryAction,
  FetchAllCountriesAction,
  ActionTypes,
  BaseSearchAction,
  Action,
} from 'state/actionTypes';
import {
  CountryConnection,
  CountryListResponse,
  CountrySearchError,
  ICountriesSearchResponse,
  State,
} from 'types';

const getCountriesFromPayload = (payload: ICountriesSearchResponse) => {
  const { countries } = payload;
  return countries as CountryConnection;
};

export const emptySearchQueryReducer = (
  state: State,
  _action: EmptySearchQueryAction
): Partial<State> => ({
  countryListResponse: state.cache?.countryListResponse,
  searchQuery: state.cache?.searchQuery,
});

const fetchAllCountriesReducer = (
  state: State,
  action: FetchAllCountriesAction
): Partial<State> => {
  const { nodes, pageInfo } = getCountriesFromPayload(action.payload);
  const countryList = state.cache?.countryListResponse?.countries ?? [];
  const cache = {
    countryListResponse: {
      countries: countryList.concat(nodes),
      pageInfo,
    },
    searchQuery: state.searchQuery,
  };

  return {
    cache,
    countryListResponse: cache!.countryListResponse,
  };
};

const searchCountriesReducer = (state: State, action: SearchCountriesAction): Partial<State> => {
  const { nodes, pageInfo } = getCountriesFromPayload(action.payload);
  const offset = state.searchQuery?.query?.offset ?? 0;
  const countryListResponse: CountryListResponse = {
    countries: offset < 1 ? nodes : (state.countryListResponse?.countries ?? []).concat(nodes),
    pageInfo,
  };

  return {
    countryListResponse,
  };
};

const fetchCountriesByRegionReducer = (
  state: State,
  action: FetchAllCountriesAction
): Partial<State> => {
  const { nodes, pageInfo } = getCountriesFromPayload(action.payload);
  const offset = state.searchQuery?.query?.offset ?? 0;
  const countryListResponse: CountryListResponse = {
    countries: offset < 1 ? nodes : (state.countryListResponse?.countries ?? []).concat(nodes),
    pageInfo,
  };

  const cache = {
    countryListResponse,
    searchQuery: state.searchQuery,
  };

  return {
    cache,
    countryListResponse,
    searchQuery: state.cache?.searchQuery,
  };
};

type SearchReducerStrategy = {
  check: (state: State, action: BaseSearchAction) => boolean;
  reduce: (state: State, action: BaseSearchAction) => Partial<State>;
};

const countriesSearchErrorReducerStrategy: SearchReducerStrategy = {
  check: (_state: State, action: BaseSearchAction) =>
    action.payload.countries.__typename === 'CountrySearchError',
  reduce: (_state: State, action: BaseSearchAction) => ({
    error: (action.payload.countries as CountrySearchError).message,
  }),
};

const fetchAllCountriesReducerStrategy: SearchReducerStrategy = {
  check: (_state: State, action: BaseSearchAction) =>
    action.type === ActionTypes.FETCH_ALL_COUNTRIES,
  reduce: (state: State, action: BaseSearchAction) => fetchAllCountriesReducer(state, action),
};

const fetchCountriesByRegionReducerStrategy: SearchReducerStrategy = {
  check: (_state: State, action: BaseSearchAction) =>
    action.type === ActionTypes.FETCH_COUNTRIES_BY_REGION_QUERY,
  reduce: (state: State, action: BaseSearchAction) => fetchCountriesByRegionReducer(state, action),
};

const searchCountriesReducerStrategy: SearchReducerStrategy = {
  check: (_state: State, action: BaseSearchAction) => action.type === ActionTypes.SEARCH_COUNTRIES,
  reduce: (state: State, action: BaseSearchAction) => searchCountriesReducer(state, action),
};

const emptySearchReducerStrategy: SearchReducerStrategy = {
  check: (_state: State, action: Action) => action.type === ActionTypes.EMPTY_SEARCH_QUERY,
  reduce: (state: State, action: Action) => emptySearchQueryReducer(state, action),
};

const reducerStrategies: SearchReducerStrategy[] = [
  emptySearchReducerStrategy,
  countriesSearchErrorReducerStrategy,
  fetchAllCountriesReducerStrategy,
  fetchCountriesByRegionReducerStrategy,
  searchCountriesReducerStrategy,
];

export const searchReducer = (state: State, action: BaseSearchAction): State => {
  const reducerStrategy = reducerStrategies.find(({ check }) => check(state, action));
  if (!reducerStrategy) return { ...state };

  const partialState = reducerStrategy.reduce(state, action);
  return {
    ...state,
    ...partialState,
    loading: false,
  };
};
