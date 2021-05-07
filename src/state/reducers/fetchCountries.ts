import { FetchCountriesAction } from 'state/actionTypes';
import { CountriesResponse, CountryConnection, CountrySearchError, State } from 'types';

const getPartialState = (countries: CountriesResponse): Partial<State> => {
  // eslint-disable-next-line no-underscore-dangle
  if (countries.__typename === 'CountrySearchError') {
    return { error: (countries as CountrySearchError).message };
  }

  const { nodes, pageInfo } = countries as CountryConnection;

  return {
    countries: nodes,
    pageInfo,
  };
};

export const fetchCountries = (state: State, action: FetchCountriesAction): State => {
  const { countries } = action.payload;

  const partialState = getPartialState(countries);

  return {
    ...state,
    ...partialState,
    loading: false,
  };
};
