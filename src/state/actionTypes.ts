import { ICountriesSearchResponse, QueryInput } from 'types';

export enum ActionTypes {
  FETCH_ALL_COUNTRIES = 'FETCH_ALL_COUNTRIES',
  SEARCH_COUNTRIES = 'SEARCH_COUNTRIES',
  EMPTY_SEARCH_QUERY = 'EMPTY_SEARCH_QUERY',
  FETCH_COUNTRIES_BY_REGION_QUERY = 'FETCH_COUNTRIES_BY_REGION_QUERY',
}

interface BaseAction {
  type: ActionTypes;
  payload?: {
    countryResponse?: ICountriesSearchResponse;
    queryInput?: QueryInput;
  };
}

export interface EmptySearchQueryAction extends BaseAction {}
export interface FetchAllCountriesAction extends BaseAction {}
export interface SearchCountriesAction extends BaseAction {}
export interface FetchCountriesByRegionAction extends BaseAction {}

export type Action =
  | FetchAllCountriesAction
  | SearchCountriesAction
  | EmptySearchQueryAction
  | FetchCountriesByRegionAction;
