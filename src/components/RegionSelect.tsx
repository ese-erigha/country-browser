import React, { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ActionTypes } from 'types';
import { buildQueryVariables } from 'helpers';
import useFetchData from 'hooks/useFetchData';
import { AppContext } from 'state/context';

const regionMap: Record<string, string> = {
  Africa: 'Africa',
  Americas: 'America',
  Asia: 'Asia',
  Europe: 'Europe',
  Oceania: 'Oceania',
};

const regionMapEntries = Object.entries(regionMap).sort((a, b) => a[0].localeCompare(b[0]));

const RegionSelect = () => {
  const {
    state: { activeQuery },
  } = useContext(AppContext);
  const [selectedRegionValue, setSelectedRegionValue] = useState('');
  const [dropdownText, setDropdownText] = useState('');
  const { fetchData } = useFetchData(ActionTypes.FETCH_COUNTRIES_BY_REGION_QUERY);

  const handleSelect = (eventKey: string | null) => {
    const key = eventKey!;
    const newVariables = buildQueryVariables({ offset: 0, region: key });
    setDropdownText(regionMap[key]);
    setSelectedRegionValue(key);
    fetchData(newVariables);
  };

  useEffect(() => {
    const regionValue = activeQuery?.value?.region;
    if (regionValue) setSelectedRegionValue(regionMap[regionValue]);
    setDropdownText(regionValue ?? 'Filter by Region');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="region-selector">
      <DropdownButton onSelect={handleSelect} id="dropdown-basic-button" title={dropdownText}>
        {regionMapEntries.map((region) => (
          <Dropdown.Item
            active={selectedRegionValue === region[0]}
            key={region[0]}
            eventKey={region[0]}
          >
            {region[1]}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};
export default RegionSelect;
