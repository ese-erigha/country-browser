import { ICountriesSearchResponse } from 'types';

export enum ActionTypes {
  FETCH_COUNTRIES = 'FETCH_COUNTRIES',
  SEARCH_COUNTRIES = 'SEARCH_COUNTRIES',
  EMPTY_SEARCH_QUERY = 'EMPTY_SEARCH_QUERY',
  FETCH_COUNTRIES_BY_REGION_QUERY = 'FETCH_COUNTRIES_BY_REGION_QUERY',
}

interface BaseAction {
  type: ActionTypes;
}

export interface FetchCountriesAction extends BaseAction {
  payload: ICountriesSearchResponse;
}

export interface SearchCountriesAction extends FetchCountriesAction {}

export interface EmptySearchQueryAction extends BaseAction {}

export interface FetchCountriesByRegionAction extends FetchCountriesAction {}

export type Action =
  | FetchCountriesAction
  | SearchCountriesAction
  | EmptySearchQueryAction
  | FetchCountriesByRegionAction;
