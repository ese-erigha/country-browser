import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { onError } from '@apollo/client/link/error';
import { GRAPHQL_URI } from 'config';

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const { addToast } = useToasts();
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => addToast(message, { appearance: 'error' }));
  }

  if (networkError) addToast(networkError.message, { appearance: 'error' });
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});
