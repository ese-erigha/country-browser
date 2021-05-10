import React, { ChangeEvent, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { QueryType } from 'types';
import { AppContext } from 'state/context';
import { ActionTypes } from 'state/actionTypes';

const SearchBox = () => {
  const { dispatch } = useContext(AppContext);
  const [input, setInput] = useState<string>('');

  const performSearch = (query: string) => {
    dispatch({
      type: ActionTypes.SET_COUNTRIES_SEARCH_QUERY,
      payload: {
        type: QueryType.SEARCH_COUNTRIES,
        query: {
          offset: 0,
          name: query,
        },
      },
    });
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
