import gql from 'graphql-tag';

export const GET_REGIONS_QUERY = gql`
  query GetRegion($_id: String, $name: String, $first: Int, $orderBy: [_RegionOrdering]) {
    Region(_id: $_id, name: $name, first: $first, orderBy: $orderBy) {
      _id
      name
      subregions(first: 100, orderBy: [name_asc]) {
        countries(first: 100, orderBy: [name_asc]) {
          name
          population
          capital
          flag {
            svgFile
          }
        }
      }
    }
  }
`;

export const SEARCH_COUNTRIES_QUERY = gql`
  query SearchCountry($name: String) {
    Country(name: $name, orderBy: [name_asc]) {
      _id
      name
      population
      capital
      flag {
        svgFile
      }
    }
  }
`;
