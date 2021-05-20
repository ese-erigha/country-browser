import {
  SearchCountriesAction,
  EmptySearchQueryAction,
  FetchAllCountriesAction,
  Action,
} from 'state/actionTypes';
import {
  ActionTypes,
  CountryConnection,
  CountryListResponse,
  CountrySearchError,
  ICountriesSearchResponse,
  Query,
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
  activeQuery: state.cache?.activeQuery,
  pageInfo: state.cache?.pageInfo,
});

const rootReducer = (state: State, action: Action) => {
  if (!action.payload || !action?.payload.countryResponse?.countries) return { ...state };
  const { queryInput, countryResponse } = action.payload;
  const { nodes, pageInfo } = getCountriesFromPayload(countryResponse);
  const offset = queryInput?.offset ?? 0;
  const countryListResponse: CountryListResponse = {
    countries: offset < 1 ? nodes : (state.countryListResponse?.countries ?? []).concat(nodes),
    pageInfo,
  };

  const activeQuery: Query = {
    type: action.type,
    value: queryInput!,
  };

  const cache = {
    countryListResponse,
    activeQuery,
    pageInfo,
  };

  return {
    cache,
    countryListResponse,
    pageInfo,
    activeQuery,
  };
};

const fetchAllCountriesReducer = (state: State, action: FetchAllCountriesAction): Partial<State> =>
  rootReducer(state, action);

const fetchCountriesByRegionReducer = (
  state: State,
  action: FetchAllCountriesAction
): Partial<State> => rootReducer(state, action);

const searchCountriesReducer = (state: State, action: SearchCountriesAction): Partial<State> => {
  const { countryListResponse, pageInfo, activeQuery } = rootReducer(state, action);
  return {
    countryListResponse,
    pageInfo,
    activeQuery,
  };
};

type SearchReducerStrategy = {
  check: (state: State, action: Action) => boolean;
  reduce: (state: State, action: Action) => Partial<State>;
};

const countriesSearchErrorReducerStrategy: SearchReducerStrategy = {
  check: (_state: State, action: Action) =>
    action.payload?.countryResponse?.countries.__typename === 'CountrySearchError',
  reduce: (_state: State, action: Action) => ({
    error: (action.payload?.countryResponse?.countries as CountrySearchError).message,
  }),
};

const fetchAllCountriesReducerStrategy: SearchReducerStrategy = {
  check: (_state: State, action: Action) => action.type === ActionTypes.FETCH_ALL_COUNTRIES,
  reduce: (state: State, action: Action) => fetchAllCountriesReducer(state, action),
};

const fetchCountriesByRegionReducerStrategy: SearchReducerStrategy = {
  check: (_state: State, action: Action) =>
    action.type === ActionTypes.FETCH_COUNTRIES_BY_REGION_QUERY,
  reduce: (state: State, action: Action) => fetchCountriesByRegionReducer(state, action),
};

const searchCountriesReducerStrategy: SearchReducerStrategy = {
  check: (_state: State, action: Action) => action.type === ActionTypes.SEARCH_COUNTRIES,
  reduce: (state: State, action: Action) => searchCountriesReducer(state, action),
};

const emptySearchReducerStrategy: SearchReducerStrategy = {
  check: (_state: State, action: Action) => action.type === ActionTypes.EMPTY_SEARCH_QUERY,
  reduce: (state: State, action: Action) => emptySearchQueryReducer(state, action),
};

export const reducerStrategies: SearchReducerStrategy[] = [
  emptySearchReducerStrategy,
  countriesSearchErrorReducerStrategy,
  fetchAllCountriesReducerStrategy,
  fetchCountriesByRegionReducerStrategy,
  searchCountriesReducerStrategy,
];

export const searchReducer = (state: State, action: Action): State => {
  const reducerStrategy = reducerStrategies.find(({ check }) => check(state, action));
  if (!reducerStrategy) return { ...state };

  const partialState = reducerStrategy.reduce(state, action);
  return {
    ...state,
    ...partialState,
    loading: false,
  };
};
