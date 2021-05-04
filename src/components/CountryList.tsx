import React from 'react';
import CountryCard from './CountryCard';
import { mappedCountries } from '../fixtures';

const CountryList = () => {
  console.log('Hello!!!');
  return (
    <>
      <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
        {mappedCountries.map((country) => (
          <CountryCard key={`${country.id}${country.name}`} country={country} />
        ))}
      </div>
    </>
  );
};

export default CountryList;
