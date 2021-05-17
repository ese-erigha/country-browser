import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCH_COUNTRIES_QUERY } from 'api';
import { buildQueryVariables } from 'helpers';
import { useState, useContext } from 'react';
import { AppContext } from 'state/context';
import { ActionTypes, ICountriesSearchResponse, QueryInput } from 'types';

type Variables = {
  countryInput: QueryInput;
};

const useFetchData = (actionType: ActionTypes) => {
  const { dispatch } = useContext(AppContext);
  const [variables, setVariables] = useState<{ countryInput: QueryInput }>(
    buildQueryVariables({ offset: 0 })
  );

  const onCompleted = (data: ICountriesSearchResponse) =>
    dispatch({
      type: actionType,
      payload: {
        countryResponse: data,
        queryInput: variables.countryInput,
      },
    });

  const [fetchCountries] = useLazyQuery<ICountriesSearchResponse>(SEARCH_COUNTRIES_QUERY, {
    onCompleted,
    notifyOnNetworkStatusChange: true,
    variables,
  });

  const fetchData = (newVariables: Variables) => {
    setVariables(newVariables);
    fetchCountries({ variables: newVariables });
  };

  return { fetchData };
};

export default useFetchData;
