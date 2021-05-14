import { ReactNode } from 'react';

export type PageProps = {
  children: ReactNode;
};

export interface MappedCountry {
  id: string;
  metaId: string;
  name: string;
  alpha2Code: string;
  capital: string;
  population: number;
  flag: string;
  region: string;
}

export type Language = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};

export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

type RegionalBloc = {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
};

export interface Country extends MappedCountry {
  alpha3Code: string;
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: Currency[];
  languages: Language[];
  callingCodes: string[];
  altSpellings: string[];
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: Country[];
  numericCode: string;
  translations: {
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
  };
  regionalBlocs: RegionalBloc[];
  cioc: string;
}

export type ICountry = {
  country: Country;
};

type ApiError = {
  message: string;
};

export interface CountrySearchError extends ApiError {}
export interface CountryNotFound extends ApiError {}
type ResponseType = { __typename: string };

export type PageInfo = {
  hasPrevPage: boolean;
  hasNextPage: boolean;
};
export type CountryConnection = {
  pageInfo: PageInfo;
  nodes: MappedCountry[];
};
type CountrySearchResponse = CountryConnection | CountrySearchError;
type CountryResponse = Country | CountryNotFound;

export type ICountriesSearchResponse = {
  countries: ResponseType & CountrySearchResponse;
};

export type ICountryResponse = {
  country: ResponseType & CountryResponse;
};

export type CountryListResponse = {
  countries?: MappedCountry[];
  pageInfo?: PageInfo;
};

export enum QueryType {
  REGION_SELECT = 'REGION_SELECT',
  SEARCH_COUNTRIES = 'SEARCH_COUNTRIES',

  FETCH_ALL_COUNTRIES = 'FETCH_ALL_COUNTRIES',
}

export type QueryInput = {
  offset?: number;
  name?: string;
  region?: string;
};

export type SearchQuery = {
  type: QueryType;
  query: QueryInput;
};

export type State = {
  loading: boolean;
  error?: string;
  selectedRegion?: string;
  countryListResponse?: CountryListResponse;
  cache?: {
    countryListResponse?: CountryListResponse;
    searchQuery?: SearchQuery;
  };
  searchQuery?: SearchQuery;
};
