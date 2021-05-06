import { State } from '../types';

export enum ActionTypes {
  SEARCH_COUNTRIES = 'SEARCH_COUNTRIES',
}

interface BaseAction {
  type: ActionTypes;
}

interface SearchCountriesAction extends BaseAction {
  payload: Pick<State, 'countries'>;
}

// export type Action = FetchedRegionAction | SearchCountryAction;
export type Action = SearchCountriesAction;

export const initialState: State = {
  loading: true,
  countries: [],
};

export const initState = (state: State) => state;

// const fetchedRegion = (state: State, action: FetchedRegionAction) => {
//   const { selectedRegion, regions } = action.payload;
//   return {
//     ...state,
//     selectedRegion,
//     regions,
//     loading: false,
//     countryList: mapSubRegionToArrayOfCountry(selectedRegion!.subregions),
//   };
// };

const searchCountries = (state: State, action: SearchCountriesAction) => {
  const { countries } = action.payload;
  return {
    ...state,
    countries,
  };
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    // case 'FETCHED_REGION':
    //   return fetchedRegion(state, action as FetchedRegionAction);

    case 'SEARCH_COUNTRIES':
      return searchCountries(state, action as SearchCountriesAction);

    default:
      return { ...state };
  }
};
