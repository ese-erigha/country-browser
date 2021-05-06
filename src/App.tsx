import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LoadingSpinner from 'components/LoadingSpinner';
import Layout from 'components/Layout';
import AppContextProvider from './AppContextProvider';
import Routes from './routes';
import 'assets/scss/custom.scss';

function App() {
  return (
    <HelmetProvider>
      <AppContextProvider>
        <Router>
          <div className="App">
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes />
              </Suspense>
            </Layout>
          </div>
        </Router>
      </AppContextProvider>
    </HelmetProvider>
  );
}

export default App;
