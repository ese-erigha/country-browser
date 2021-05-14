import React, { useContext, useEffect } from 'react';
import CountryList from 'components/CountryList';
import { Helmet } from 'react-helmet-async';
import SearchBox from 'components/SearchBox';
import RegionSelect from 'components/RegionSelect';
import { AppContext } from 'state/context';
import { useLazyQuery } from '@apollo/react-hooks';
import { ICountriesSearchResponse, QueryType, SearchQuery } from 'types';
import { SEARCH_COUNTRIES_QUERY } from 'api';
import { ActionTypes } from 'state/actionTypes';
import { WEBSITE_NAME } from '../constants';

const buildQueryVariables = (searchQuery?: SearchQuery, queryOffset?: number) => {
  const queryInput = searchQuery ? searchQuery.query : { offset: 0 };
  return {
    countryInput: {
      ...queryInput,
      offset: queryOffset ?? queryInput.offset,
    },
  };
};

const getActionTypeFromSearchQuery = (searchQuery?: SearchQuery): ActionTypes => {
  if (!searchQuery) return ActionTypes.SEARCH_COUNTRIES;
  const { type } = searchQuery;
  if (type === QueryType.FETCH_ALL_COUNTRIES) return ActionTypes.FETCH_ALL_COUNTRIES;
  if (type === QueryType.SEARCH_COUNTRIES) return ActionTypes.SEARCH_COUNTRIES;
  return ActionTypes.FETCH_COUNTRIES_BY_REGION_QUERY;
};

const isEmptySearchQuery = (searchQueryData?: SearchQuery) =>
  searchQueryData &&
  searchQueryData.type === QueryType.SEARCH_COUNTRIES &&
  !searchQueryData.query?.name?.length;

const Home = () => {
  const {
    dispatch,
    state: { searchQuery },
  } = useContext(AppContext);

  // const fetchMore = (newOffset: number) => {
  //   if (isEmptySearchQuery(searchQuery)) return;
  //   const { query, type } = searchQuery!;

  //   dispatch({
  //     type: ActionTypes.SET_COUNTRIES_SEARCH_QUERY,
  //     payload: {
  //       ...searchQuery,
  //       type,
  //       query: {
  //         ...query,
  //         offset: newOffset,
  //       },
  //     },
  //   });
  // };

  // eslint-disable-next-line func-names
  const onCompleted = function (data: ICountriesSearchResponse) {
    dispatch({
      type: getActionTypeFromSearchQuery(searchQuery),
      payload: data,
    });
  };

  const [fetchCountries, { refetch }] = useLazyQuery<ICountriesSearchResponse>(
    SEARCH_COUNTRIES_QUERY,
    {
      onCompleted,
      notifyOnNetworkStatusChange: true,
      variables: buildQueryVariables(),
    }
  );

  const handleFetch = (searchQueryData?: SearchQuery) => {
    // Initial page load
    if (!searchQuery) {
      fetchCountries();
      return;
    }

    // Happens when search box has empty string
    if (isEmptySearchQuery(searchQueryData)) {
      console.log('Got here!!!');
      dispatch({ type: ActionTypes.EMPTY_SEARCH_QUERY });
      return;
    }

    refetch!(buildQueryVariables(searchQueryData));
  };

  useEffect(() => {
    handleFetch(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

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
