import { ICountriesSearchResponse, SearchQuery } from 'types';

export enum ActionTypes {
  FETCH_ALL_COUNTRIES = 'FETCH_ALL_COUNTRIES',
  SEARCH_COUNTRIES = 'SEARCH_COUNTRIES',
  EMPTY_SEARCH_QUERY = 'EMPTY_SEARCH_QUERY',
  FETCH_COUNTRIES_BY_REGION_QUERY = 'FETCH_COUNTRIES_BY_REGION_QUERY',
  SET_COUNTRIES_SEARCH_QUERY = 'SET_COUNTRIES_SEARCH_QUERY',
}

interface BaseAction {
  type: ActionTypes;
}

export interface EmptySearchQueryAction extends BaseAction {}
export interface SetCountriesSearchQueryAction extends BaseAction {
  payload: SearchQuery;
}
export interface BaseSearchAction extends BaseAction {
  payload: ICountriesSearchResponse;
}
export interface FetchAllCountriesAction extends BaseSearchAction {}
export interface SearchCountriesAction extends BaseSearchAction {}
export interface FetchCountriesByRegionAction extends BaseSearchAction {}

export type Action =
  | BaseSearchAction
  | FetchAllCountriesAction
  | SearchCountriesAction
  | EmptySearchQueryAction
  | FetchCountriesByRegionAction
  | SetCountriesSearchQueryAction;
