import React, { useContext, useEffect } from 'react';
import CountryList from 'components/CountryList';
import { Helmet } from 'react-helmet-async';
import SearchBox from 'components/SearchBox';
import RegionSelect from 'components/RegionSelect';
import { AppContext } from 'state/context';
import { useLazyQuery } from '@apollo/react-hooks';
import { ICountriesSearchResponse } from 'types';
import { SEARCH_COUNTRIES_QUERY } from 'api';
import { ActionTypes } from 'state/actionTypes';
import { WEBSITE_NAME } from '../constants';

const buildSearchQueryParams = (offset: number = 0) => ({ countryInput: { offset } });

const Home = () => {
  const { dispatch } = useContext(AppContext);
  const onCompleted = (data: ICountriesSearchResponse) =>
    dispatch({
      type: ActionTypes.FETCH_COUNTRIES,
      payload: data,
    });
  const variables = buildSearchQueryParams();
  const [fetchCountries, { loading, refetch }] = useLazyQuery<ICountriesSearchResponse>(
    SEARCH_COUNTRIES_QUERY,
    {
      variables,
      onCompleted,
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

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
