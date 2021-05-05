import React from 'react';
import CountryList from 'components/CountryList';
import { Helmet } from 'react-helmet-async';
import SearchBox from 'components/SearchBox';
import RegionSelector from 'components/Region';
import { WEBSITE_NAME } from '../constants';

const Home = () => {
  console.log('Home');
  return (
    <>
      <Helmet>
        <title>{WEBSITE_NAME}</title>
      </Helmet>
      <div className="home-widget-grid mb-30">
        <SearchBox />
        <RegionSelector />
      </div>
      <CountryList />
    </>
  );
};
export default Home;
