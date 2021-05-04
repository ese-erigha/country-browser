import React from 'react';
import CountryList from 'components/CountryList';
import { Helmet } from 'react-helmet-async';
import { WEBSITE_NAME } from '../constants';

const Home = () => {
  console.log('Home');
  return (
    <>
      <Helmet>
        <title>{WEBSITE_NAME}</title>
      </Helmet>
      <CountryList />
    </>
  );
};
export default Home;
