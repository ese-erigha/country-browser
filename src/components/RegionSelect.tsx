import React, { useContext, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AppContext } from 'state/context';
import { SEARCH_COUNTRIES_QUERY } from 'api';
import { ActionTypes, ICountriesSearchResponse } from 'types';
import { OperationVariables, useLazyQuery } from '@apollo/react-hooks';
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
  let variables: OperationVariables | undefined = {};

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
    setDropdownText(regionMap[key]);
    setSelectedRegionValue(key);
    variables = buildQueryVariables({ offset: 0, region: key });
    fetchCountriesByRegion({ variables });
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
