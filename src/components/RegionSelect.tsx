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
  const [selectedRegionKey, setSelectedRegionKey] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { fetchData } = useFetchData(ActionTypes.FETCH_COUNTRIES_BY_REGION_QUERY);

  const handleSelect = (eventKey: string | null) => {
    const key = eventKey!;
    const newVariables = buildQueryVariables({ offset: 0, region: key });
    setSelectedRegion(regionMap[key]);
    setSelectedRegionKey(key);
    fetchData(newVariables);
  };

  useEffect(() => {
    const regionKey = activeQuery?.value?.region;
    let regionText = 'Filter by Region';
    if (regionKey) {
      setSelectedRegionKey(regionKey);
      regionText = regionMap[regionKey];
    }
    setSelectedRegion(regionText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="region-selector">
      <DropdownButton onSelect={handleSelect} id="dropdown-basic-button" title={selectedRegion}>
        {regionMapEntries.map(([key, value]) => (
          <Dropdown.Item active={selectedRegionKey === key} key={key} eventKey={key}>
            {value}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};
export default RegionSelect;
