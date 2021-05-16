import React, { ChangeEvent, useState, useCallback, useContext } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ActionTypes, ICountriesSearchResponse, QueryInput } from 'types';
import { AppContext } from 'state/context';
import { SEARCH_COUNTRIES_QUERY } from 'api';
import { buildQueryVariables } from 'helpers';

const SearchBox = () => {
  const { dispatch } = useContext(AppContext);
  const [input, setInput] = useState<string>('');
  const [variables, setVariables] = useState<{ countryInput: QueryInput }>(
    buildQueryVariables({ offset: 0 })
  );

  const onCompleted = (data: ICountriesSearchResponse) => {
    dispatch({
      type: ActionTypes.SEARCH_COUNTRIES,
      payload: {
        countryResponse: data,
        queryInput: variables!.countryInput,
      },
    });
  };

  const [searchCountries] = useLazyQuery<ICountriesSearchResponse>(SEARCH_COUNTRIES_QUERY, {
    onCompleted,
    notifyOnNetworkStatusChange: true,
    variables,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((query) => searchCountries(query), 300),
    []
  );

  const handleSearch = useCallback((query) => {
    if (!query.length) {
      dispatch({
        type: ActionTypes.EMPTY_SEARCH_QUERY,
      });
      return;
    }
    const newVariables = buildQueryVariables({ offset: 0, name: query });
    setVariables(newVariables);
    debounceSearch(newVariables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setInput(query);
    handleSearch(query);
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
