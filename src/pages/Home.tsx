import React, { useEffect } from 'react';
import CountryList from 'components/CountryList';
import { Helmet } from 'react-helmet-async';
import SearchBox from 'components/SearchBox';
import RegionSelect from 'components/RegionSelect';
import { ActionTypes } from 'types';
import { buildQueryVariables } from 'helpers';
import useFetchData from 'hooks/useFetchData';
import { WEBSITE_NAME } from '../constants';

const Home = () => {
  const { fetchData } = useFetchData(ActionTypes.FETCH_ALL_COUNTRIES);

  useEffect(() => {
    fetchData(buildQueryVariables({ offset: 0 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
