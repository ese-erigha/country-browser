import { buildQueryVariables } from 'helpers';
import debounce from 'lodash.debounce';
import useFetchData from 'hooks/useFetchData';
import React, { useCallback, useContext, useLayoutEffect, useRef } from 'react';
import { AppContext } from 'state/context';
import { PageInfo, Query } from 'types';
import { PAGE_SIZE } from '../constants';
import CountryCard from './CountryCard';
import LoadingSpinner from './LoadingSpinner';

const option = {
  root: null,
  rootMargin: `0px 0px 10px 0px`,
  threshold: 1.0,
};

const CountryList = () => {
  const {
    state: { loading: contextLoading, countryListResponse, activeQuery, pageInfo },
  } = useContext(AppContext);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { loading: dataLoading, fetchData } = useFetchData();
  const loading = contextLoading || dataLoading;

  const handlePagination = (currentQuery?: Query, currentPageInfo?: PageInfo) => {
    const currentOffset = currentQuery?.value?.offset ?? -1;
    if (currentPageInfo?.hasNextPage && currentOffset >= 0) {
      const activeQueryInput = currentQuery?.value ?? {};
      fetchData(buildQueryVariables({ ...activeQueryInput, offset: currentOffset + PAGE_SIZE }));
    }
  };

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (!loading && target.isIntersecting) handlePagination(activeQuery, pageInfo);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeQuery?.value]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceScroll = useCallback(
    debounce((observer) => observer.observe(loaderRef.current), 500),
    []
  );

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) debounceScroll(observer);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
