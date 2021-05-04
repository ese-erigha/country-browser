import React from 'react';
import CountryList from 'components/CountryList';
import { Helmet } from 'react-helmet-async';
import SearchBox from 'components/SearchBox';
import { WEBSITE_NAME } from '../constants';

const Home = () => {
  console.log('Home');
  return (
    <>
      <Helmet>
        <title>{WEBSITE_NAME}</title>
      </Helmet>
      <div className="d-flex flex-wrap mb-30">
        <div className="align-self-start width-40">
          <SearchBox />
        </div>
      </div>
      <CountryList />
    </>
  );
};
export default Home;
