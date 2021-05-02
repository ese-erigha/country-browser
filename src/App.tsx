import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LoadingSpinner from 'components/LoadingSpinner';
import Layout from 'components/Layout';
import Routes from './routes';

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <Router>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes />
            </Suspense>
          </Layout>
        </Router>
      </div>
    </HelmetProvider>
  );
}

export default App;
