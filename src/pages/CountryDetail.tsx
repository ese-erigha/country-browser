import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import Flag from 'components/Country/Flag';
import { country } from 'fixtures';
import Description from 'components/Country/Description';
import { WEBSITE_NAME } from '../constants';

const CountryDetail = () => {
  console.log('Country Detail');
  return (
    <>
      <Helmet>
        <title>{WEBSITE_NAME}</title>
      </Helmet>
      <div className="back-button-wrapper">
        <a href="/countries" className="btn click-button space-left-10">
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
          <span className="space-left-10">Back</span>
        </a>
      </div>
      <div className="d-flex flex-wrap justify-content-md-between justify-content-center mt-100 detail-wrapper">
        <Flag flag={country.flag} />
        <Description country={country} />
      </div>
    </>
  );
};
export default CountryDetail;
