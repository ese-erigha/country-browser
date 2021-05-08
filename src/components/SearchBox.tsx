import React, { ChangeEvent, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import { useQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SEARCH_COUNTRIES_QUERY } from 'api';
import { ICountriesSearchResponse } from 'types';
import { AppContext } from 'state/context';
import { ActionTypes } from 'state/actionTypes';

const buildQueryVariables = (query: string) => ({
  variables: { countryInput: { name: query } },
});

const SearchBox = () => {
  const { dispatch } = useContext(AppContext);
  const [input, setInput] = useState<string>('');

  const performSearch = (query: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useQuery<ICountriesSearchResponse>(
      SEARCH_COUNTRIES_QUERY,
      buildQueryVariables(query)
    );

    if (data) {
      dispatch({
        type: ActionTypes.SEARCH_COUNTRIES,
        payload: data,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((query) => performSearch(query), 300),
    []
  );

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setInput(query);
    if (query.length) {
      dispatch({
        type: ActionTypes.EMPTY_SEARCH_QUERY,
      });
      return;
    }
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
