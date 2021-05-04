import React from 'react';
import Card from 'react-bootstrap/Card';
import { MappedCountry } from 'types';

type Props = {
  country: MappedCountry;
};

const CountryCard = (props: Props) => {
  const { country } = props;

  return (
    <Card className="country-card">
      <a data-testid="link" href={`/country/${country.id}`}>
        <Card.Img
          id="image"
          alt={country.name}
          className="fadeIn animated"
          variant="top"
          src={country.flag}
        />
        <Card.Body>
          <Card.Title className="mr-4 very-dark-blue weight-800">{country.name}</Card.Title>
          <div className="mt-20">
            <p className="mb-down">
              <span className="weight-600 space-right-4">Population:</span>
              {country.population.toLocaleString()}
            </p>
            <p className="mb-down">
              <span className="weight-600 space-right-4">Region:</span>
              {country.region}
            </p>
            <p className="mb-down">
              <span className="weight-600 space-right-4">Capital:</span>
              {country.capital}
            </p>
          </div>
        </Card.Body>
      </a>
    </Card>
  );
};
export default CountryCard;
