import React from 'react';
import { Country, Currency, Language } from 'types';

type Props = {
  country: Country;
};
const mapFn = (item: Currency | Language) => item.name;
const arrToString = (items: Currency[] | Language[]) => items.map(mapFn).join(', ');

const Description = ({ country }: Props) => (
  <div className="pt-25 pb-25 description">
    <h2 className="name">{country.name}</h2>
    <div className="details-grid">
      <div className="left-side">
        <p className="mb-down">
          <span className="weight-600 space-right-4">Native Name:</span>
          {country.nativeName}
        </p>
        <p className="mb-down">
          <span className="weight-600 space-right-4">Population:</span>
          {country.population.toLocaleString()}
        </p>
        <p className="mb-down">
          <span className="weight-600 space-right-4">Region:</span>
          {country.region}
        </p>
        <p className="mb-down">
          <span className="weight-600 space-right-4">Sub Region:</span>
          {country.subregion}
        </p>
        <p className="mb-down">
          <span className="weight-600 space-right-4">Capital:</span>
          {country.capital}
        </p>
      </div>
      <div className="right-side">
        <p className="mb-down">
          <span className="weight-600 space-right-4">Top Level Domain:</span>
          {country.topLevelDomain.join(', ')}
        </p>
        <p className="mb-down">
          <span className="weight-600 space-right-4">Currencies:</span>
          {arrToString(country.currencies)}
        </p>
        <p className="mb-down">
          <span className="weight-600 space-right-4">Languages:</span>
          {arrToString(country.languages)}
        </p>
      </div>
    </div>
    <div className="border-countries">
      <div className="title">
        <span className="weight-600">Border Countries:</span>
      </div>
      <div className="d-flex flex-wrap justify-content-start borders">
        {country.borders.map((borderCountry: Country) => (
          <a
            key={borderCountry.name}
            href={`/country/${borderCountry.metaId}`}
            className="btn click-button space-right-4 width-auto inline"
          >
            <span>{borderCountry.name}</span>
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default Description;
