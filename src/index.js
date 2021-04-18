import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import App from "./App";
import "focus-visible/dist/focus-visible";
import { ChakraProvider } from "@chakra-ui/react";
import { ModeProvider } from "./contexts/ModeContext";
import { SearchProvider } from "./contexts/SearchContext";
import { NewPostProvider } from "./contexts/NewPostContext";
import React from "react";
import ReactDOM from "react-dom";
import { TimeLimitProvider } from "./contexts/TimeLimitContext";
import { UserProvider } from "./contexts/UserContext";
import { onError } from "apollo-link-error";

const httpLink = createHttpLink({
  uri: "https://writeon-app.herokuapp.com/graphql",
  credentials: "include",
});

//! ERROR LINK FOR DEBUGGING PURPOSES
const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, httpLink]),
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
          SearchProvider,
          TimeLimitProvider,
          NewPostProvider,
        ]}
      >
        <App />
      </Compose>
    </ChakraProvider>
  </ApolloProvider>,
  rootElement
);
