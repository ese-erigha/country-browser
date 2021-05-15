import React, { ChangeEvent, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ICountriesSearchResponse } from 'types';
import { AppContext } from 'state/context';
import { ActionTypes } from 'state/actionTypes';
import { OperationVariables, useLazyQuery } from '@apollo/react-hooks';
import { SEARCH_COUNTRIES_QUERY } from 'api';
import { buildQueryVariables } from 'helpers';

const SearchBox = () => {
  const { dispatch } = useContext(AppContext);
  const [input, setInput] = useState<string>('');
  let variables: OperationVariables | undefined = {};

  const onCompleted = (data: ICountriesSearchResponse) =>
    dispatch({
      type: ActionTypes.SEARCH_COUNTRIES,
      payload: {
        countryResponse: data,
        queryInput: variables!.countryInput,
      },
    });

  const [searchCountries] = useLazyQuery<ICountriesSearchResponse>(SEARCH_COUNTRIES_QUERY, {
    onCompleted,
    notifyOnNetworkStatusChange: true,
    variables,
  });

  const performSearch = (query: string) => {
    if (!query.length) {
      dispatch({
        type: ActionTypes.EMPTY_SEARCH_QUERY,
      });
      return;
    }
    variables = buildQueryVariables({ offset: 0, name: query });
    searchCountries({ variables });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((query) => performSearch(query), 300),
    []
  );

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setInput(query);
    debounceSearch(query);
  };

  return (
    <div className="search-box">
      <div className="form-group has-search">
        <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={onChangeHandler}
          placeholder="Search for a country..."
        />
      </div>
    </div>
  );
};
export default SearchBox;
