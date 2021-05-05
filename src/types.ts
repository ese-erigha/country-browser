import { ReactNode } from 'react';

export type PageProps = {
  children: ReactNode;
};

export interface MappedCountry {
  id: string;
  name: string;
  alpha2Code: string;
  capital: string;
  population: number;
  flag: string;
  region: string;
}

export type Language = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};

export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

type RegionalBloc = {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
};

export interface Country extends MappedCountry {
  alpha3Code: string;
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: Currency[];
  languages: Language[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  borderCountries: any;
  callingCodes: string[];
  altSpellings: string[];
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  numericCode: string;
  translations: {
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
  };
  regionalBlocs: RegionalBloc[];
  cioc: string;
}
