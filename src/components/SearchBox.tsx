import React, { ChangeEvent, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ActionTypes } from 'types';
import { AppContext } from 'state/context';
import { buildQueryVariables } from 'helpers';
import useFetchData from 'hooks/useFetchData';

const SearchBox = () => {
  const { dispatch } = useContext(AppContext);
  const [input, setInput] = useState<string>('');
  const { fetchData } = useFetchData(ActionTypes.SEARCH_COUNTRIES);

  const performSearch = (query: string) => {
    if (!query.length) {
      dispatch({
        type: ActionTypes.EMPTY_SEARCH_QUERY,
      });
      return;
    }
    fetchData(buildQueryVariables({ offset: 0, name: query }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((query) => performSearch(query), 200),
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
