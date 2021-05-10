import React, { useContext, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ActionTypes } from 'state/actionTypes';
import { AppContext } from 'state/context';
import { QueryType } from 'types';

const regionMap: Record<string, string> = {
  Africa: 'Africa',
  Americas: 'America',
  Asia: 'Asia',
  Europe: 'Europe',
  Oceania: 'Oceania',
};

const regionMapEntries = Object.entries(regionMap).sort((a, b) => a[0].localeCompare(b[0]));

const RegionSelect = () => {
  const { dispatch } = useContext(AppContext);
  const [selectedRegion, setSelectedRegionValue] = useState('');
  const [dropdownText, setDropdownText] = useState('Filter by Region');
  const handleSelect = (eventKey: string | null) => {
    const key = eventKey!;
    setDropdownText(regionMap[key]);
    setSelectedRegionValue(key);
    dispatch({
      type: ActionTypes.SET_COUNTRIES_SEARCH_QUERY,
      payload: {
        type: QueryType.REGION_SELECT,
        query: {
          offset: 0,
          region: key,
        },
      },
    });
  };

  return (
    <div className="region-selector">
      <DropdownButton onSelect={handleSelect} id="dropdown-basic-button" title={dropdownText}>
        {regionMapEntries.map((region) => (
          <Dropdown.Item active={selectedRegion === region[0]} key={region[0]} eventKey={region[0]}>
            {region[1]}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};
export default RegionSelect;
