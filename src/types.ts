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
