import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import React, { useContext } from "react";

import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ModeProvider } from "./ModeContext";
import { NewPostProvider } from "./NewPostContext";
import { PostProvider } from "./PostContext";
import ReactDOM from "react-dom";
import { TimeLimitProvider } from "./TimeLimitContext";
import { UserProvider } from "./UserContext";
import { onError } from 'apollo-link-error'
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include'
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    return graphQLErrors.map(({ message }) => console.log(message)) 
  }
})

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

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <Compose
        components={[
          UserProvider,
          ModeProvider,
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
