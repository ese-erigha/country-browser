import React, { useContext, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AppContext } from 'state/context';
import { SEARCH_COUNTRIES_QUERY } from 'api';
import { ActionTypes, ICountriesSearchResponse, QueryInput } from 'types';
import { useLazyQuery } from '@apollo/react-hooks';
import { buildQueryVariables } from 'helpers';

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
  const [variables, setVariables] = useState<{ countryInput: QueryInput }>(
    buildQueryVariables({ offset: 0 })
  );

  const onCompleted = (data: ICountriesSearchResponse) =>
    dispatch({
      type: ActionTypes.FETCH_COUNTRIES_BY_REGION_QUERY,
      payload: {
        countryResponse: data,
        queryInput: variables!.countryInput,
      },
    });

  const [fetchCountriesByRegion] = useLazyQuery<ICountriesSearchResponse>(SEARCH_COUNTRIES_QUERY, {
    onCompleted,
    notifyOnNetworkStatusChange: true,
    variables,
  });

  const handleSelect = (eventKey: string | null) => {
    const key = eventKey!;
    const newVariables = buildQueryVariables({ offset: 0, region: key });
    setDropdownText(regionMap[key]);
    setSelectedRegionValue(key);
    setVariables(newVariables);
    fetchCountriesByRegion({ variables: newVariables });
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
