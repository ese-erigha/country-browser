import { buildQueryVariables } from 'helpers';
import useFetchData from 'hooks/useFetchData';
import React, { useCallback, useContext, useLayoutEffect, useRef } from 'react';
import { AppContext } from 'state/context';
import { PAGE_SIZE } from '../constants';
import CountryCard from './CountryCard';
import LoadingSpinner from './LoadingSpinner';

const option = {
  root: null,
  rootMargin: `0px 0px 390px 0px`,
  threshold: 1.0,
};

const CountryList = () => {
  const {
    state: { loading: contextLoading, countryListResponse, activeQuery, pageInfo },
  } = useContext(AppContext);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { loading: dataLoading, fetchData } = useFetchData();
  const loading = contextLoading || dataLoading;

  const handleObserver = useCallback(
    (entries) => {
      if (loading) return;
      const target = entries[0];
      console.log(target);
      if (target.isIntersecting) {
        const currentOffset = activeQuery?.value?.offset ?? -1;
        if (pageInfo?.hasNextPage && currentOffset >= 0) {
          const activeQueryInput = activeQuery?.value ?? {};
          fetchData(
            buildQueryVariables({ ...activeQueryInput, offset: currentOffset + PAGE_SIZE })
          );
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeQuery?.value]
  );

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const mappedCountries = countryListResponse?.countries;
  if (loading) return <LoadingSpinner />;
  if (!mappedCountries?.length) return <div>No countries</div>;

  return (
    <>
      <div className="d-flex flex-wrap country-list-flex">
        {mappedCountries.map((country, index) => (
          <CountryCard key={`${country.id}${country.name}`} country={country} />
        ))}
      </div>
      {!loading && mappedCountries.length > 0 && (
        <div ref={loaderRef}>
          <span className="hide">Hello</span>
        </div>
      )}
    </>
  );
};

export default CountryList;
