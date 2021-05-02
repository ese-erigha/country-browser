import React from 'react';
import { PageProps } from 'types';
import Navbar from './NavBar';
import Footer from './Footer';

const Layout = (props: PageProps) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <div data-testid="container" className="container mt-100">
        <main data-testid="main">{children}</main>
        <Footer data-testid="footer" />
      </div>
    </>
  );
};

export default Layout;
