import { ICountriesSearchResponse } from 'types';

export enum ActionTypes {
  FETCH_COUNTRIES = 'FETCH_COUNTRIES',
}

interface BaseAction {
  type: ActionTypes;
}

export interface FetchCountriesAction extends BaseAction {
  payload: ICountriesSearchResponse;
}

// export type Action = FetchedRegionAction | SearchCountryAction;
export type Action = FetchCountriesAction;
