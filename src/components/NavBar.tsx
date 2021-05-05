import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => (
  <Navbar fixed="top" expand="md" className="nav-menu gray-box-shadow bg-white">
    <Container>
      <Navbar.Brand href="/" className="weight-800">
        Where in the world?
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <FontAwesomeIcon icon={faMoon} />
          <span className="space-left-4" />
          <span className="m-l-5 font-weight-550 very-dark-blue">Dark Mode</span>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
export default NavBar;
