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
  uri: 'https://writeon-app.herokuapp.com/api/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink])
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
