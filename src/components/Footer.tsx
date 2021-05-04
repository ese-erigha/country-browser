import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => (
  <footer className="footer text-center mt-4 mb-4">
    <span>&#169; 2021 made with</span>
    <span className="space-left-4" />
    <FontAwesomeIcon className="red" icon={faHeart} />
    <span className="space-left-4">by</span>
    <a href="https://github.com/eseerigha/country-browser" className="space-left-4">
      eseerigha
    </a>
  </footer>
);
export default Footer;
