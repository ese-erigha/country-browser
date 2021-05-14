import React, { useContext } from 'react';
import { AppContext } from 'state/context';
import CountryCard from './CountryCard';
// import { mappedCountries } from '../fixtures';
import LoadingSpinner from './LoadingSpinner';

const CountryList = () => {
  const {
    state: { loading, countryListResponse },
  } = useContext(AppContext);

  const mappedCountries = countryListResponse?.countries;
  if (loading) return <LoadingSpinner />;
  if (!mappedCountries?.length) return <div>No countries</div>;
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
