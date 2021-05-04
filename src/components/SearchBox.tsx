import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBox = () => {
  console.log('Hello');
  return (
    <div className="form-group has-search">
      <FontAwesomeIcon className="form-control-feedback" icon={faSearch} />
      <input type="text" className="form-control" placeholder="Search for a country..." />
    </div>
  );
};
export default SearchBox;
