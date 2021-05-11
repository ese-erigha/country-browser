import gql from 'graphql-tag';

export const FETCH_COUNTRY_BY_ID_QUERY = gql`
  query getCountry($id: String!) {
    country(id: $id) {
      __typename
      ... on CountryNotFound {
        message
      }
      ... on Country {
        id
        alpha2Code
        alpha3Code
        altSpellings
        area
        borders
        callingCodes
        capital
        cioc
        currencies {
          code
          name
          symbol
        }
        demonym
        flag
        gini
        languages {
          iso639_1
          iso639_2
          name
          nativeName
        }
        latlng
        name
        nativeName
        numericCode
        population
        region
        regionalBlocs {
          acronym
          name
          otherAcronyms
          otherNames
        }
        subregion
        timezones
        topLevelDomain
        translations {
          br
          de
          es
          fa
          fr
          hr
          it
          ja
          nl
          pt
        }
      }
    }
  }
`;

export const SEARCH_COUNTRIES_QUERY = gql`
  query searchCountries($countryInput: CountryInput!) {
    countries(countryInput: $countryInput) {
      __typename
      ... on CountryConnection {
        pageInfo {
          hasPrevPage
          hasNextPage
        }
        nodes {
          id
          name
          alpha2Code
          capital
          population
          region
          flag
        }
      }
      ... on CountrySearchError {
        message
      }
    }
  }
`;
