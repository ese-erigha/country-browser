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

const Home = () => {
  const {
    dispatch,
    state: { offset },
  } = useContext(AppContext);
  const onCompleted = (data: ICountriesSearchResponse) =>
    dispatch({
      type: ActionTypes.FETCH_COUNTRIES,
      payload: data,
    });

  const buildQueryOptions = (pageOffset: number = 0) => ({
    onCompleted,
    notifyOnNetworkStatusChange: true,
    variables: { countryInput: { offset: pageOffset } },
  });

  const [fetchCountries, { refetch }] = useLazyQuery<ICountriesSearchResponse>(
    SEARCH_COUNTRIES_QUERY,
    buildQueryOptions(offset)
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
