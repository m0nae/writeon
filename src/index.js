import React from 'react';
import ReactDOM from 'react-dom';
import 'focus-visible/dist/focus-visible';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { ModeProvider } from './contexts/ModeContext';
import { SearchProvider } from './contexts/SearchContext';
import { NewPostProvider } from './contexts/NewPostContext';
import { TimeLimitProvider } from './contexts/TimeLimitContext';
import { UserProvider } from './contexts/UserContext';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include'
});

//todo: THIS ERROR LINK IS FOR DEBUGGING PURPOSES, remove for production
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, httpLink])
});

export default function Compose(props) {
  const { components, children } = props;
  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <Compose
        components={[
          UserProvider,
          ModeProvider,
          SearchProvider,
          TimeLimitProvider,
          NewPostProvider
        ]}
      >
        <App />
      </Compose>
    </ChakraProvider>
  </ApolloProvider>,
  rootElement
);
