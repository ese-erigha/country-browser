import React, { useContext, useEffect, useState } from 'react';
import CountryList from 'components/CountryList';
import { Helmet } from 'react-helmet-async';
import SearchBox from 'components/SearchBox';
import RegionSelect from 'components/RegionSelect';
import { AppContext } from 'state/context';
import { useLazyQuery } from '@apollo/react-hooks';
import { ActionTypes, ICountriesSearchResponse, QueryInput } from 'types';
import { SEARCH_COUNTRIES_QUERY } from 'api';
import { buildQueryVariables } from 'helpers';
import { WEBSITE_NAME } from '../constants';

const Home = () => {
  const { dispatch } = useContext(AppContext);
  const [variables] = useState<{ countryInput: QueryInput }>(buildQueryVariables({ offset: 0 }));

  const onCompleted = (data: ICountriesSearchResponse) => {
    dispatch({
      type: ActionTypes.FETCH_ALL_COUNTRIES,
      payload: {
        countryResponse: data,
        queryInput: variables.countryInput,
      },
    });
  };

  const [fetchAllCountries] = useLazyQuery<ICountriesSearchResponse>(SEARCH_COUNTRIES_QUERY, {
    onCompleted,
    notifyOnNetworkStatusChange: true,
    variables,
  });

  useEffect(() => {
    fetchAllCountries();
  }, [fetchAllCountries]);

  return (
    <>
      <Helmet>
        <title>{WEBSITE_NAME}</title>
      </Helmet>
      <div className="home-widget-grid mb-30">
        <SearchBox />
        <RegionSelect />
      </div>
      <CountryList />
    </>
  );
};
export default Home;
