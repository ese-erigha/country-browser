import React, { useCallback, useContext, useEffect, useRef } from 'react';
import CountryList from 'components/CountryList';
import { Helmet } from 'react-helmet-async';
import SearchBox from 'components/SearchBox';
import RegionSelect from 'components/RegionSelect';
import { AppContext } from 'state/context';
import { useLazyQuery } from '@apollo/react-hooks';
import { ActionTypes, ICountriesSearchResponse, QueryInput } from 'types';
import { SEARCH_COUNTRIES_QUERY } from 'api';
import { buildQueryVariables } from 'helpers';
import { WEBSITE_NAME } from '../constants';

const option = {
  root: null,
  rootMargin: '20px',
  threshold: 1.0,
};

const Home = () => {
  const loader = useRef<HTMLDivElement>(null);
  const {
    dispatch,
    state: { pageInfo, activeQuery, countryListResponse },
  } = useContext(AppContext);
  const variablesRef = useRef<{ countryInput: QueryInput }>(
    buildQueryVariables(activeQuery!.value)
  );
  const currentOffset = activeQuery?.value?.offset ?? -1;

  const onCompleted = (data: ICountriesSearchResponse) => {
    dispatch({
      type: activeQuery?.type ?? ActionTypes.FETCH_ALL_COUNTRIES,
      payload: {
        countryResponse: data,
        queryInput: variablesRef.current.countryInput,
      },
    });
  };

  const [fetchAllCountries, { refetch, loading }] = useLazyQuery<ICountriesSearchResponse>(
    SEARCH_COUNTRIES_QUERY,
    {
      onCompleted,
      notifyOnNetworkStatusChange: true,
      variables: variablesRef.current,
    }
  );

  const handleObserver = useCallback(
    (entries) => {
      if (loading) return;
      const target = entries[0];
      if (target.isIntersecting && pageInfo?.hasNextPage && currentOffset >= 0) {
        variablesRef.current = buildQueryVariables({
          ...(activeQuery?.value ?? {}),
          offset: currentOffset + 12,
        });
        refetch!(variablesRef.current);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [activeQuery]
  );

  useEffect(() => {
    fetchAllCountries();
  }, [fetchAllCountries]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleObserver]);

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
      {!loading && (countryListResponse?.countries ?? []).length > 0 && <div ref={loader} />}
    </>
  );
};
export default Home;
