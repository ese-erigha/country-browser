import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const RegionSelect = () => {
  console.log('Hello');
  return (
    <div className="region-selector">
      <DropdownButton id="dropdown-basic-button" title="Filter by Region">
        <Dropdown.Item href="#/action-1">Africa</Dropdown.Item>
        <Dropdown.Item href="#/action-2">America</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Asia</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Europe</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Oceania</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};
export default RegionSelect;
