import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from 'middleware';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
