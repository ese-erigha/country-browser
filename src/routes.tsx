import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Home = lazy(() => import('pages/Home'));
const CountryDetail = lazy(() => import('pages/CountryDetail'));

export const route = {
  home: '/countries/:page(\\d+)?',
  country: '/country/:id',
};

const Routes = () => (
  <Switch>
    <Route path={route.home} exact component={Home} />
    <Route path={route.country} exact component={CountryDetail} />
    <Redirect to="/countries" />
  </Switch>
);

export default Routes;
