import { ActionTypes, ICountriesSearchResponse, QueryInput } from 'types';

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
