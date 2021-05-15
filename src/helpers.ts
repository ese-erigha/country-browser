import { QueryInput } from 'types';

export const buildQueryVariables = (queryInput: QueryInput) => ({ countryInput: queryInput });
