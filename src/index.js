import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./UserContext";
import { PostProvider } from "./PostContext";
import { ModeProvider } from "./ModeContext";
import { TimeLimitProvider } from "./TimeLimitContext";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";

import App from "./App";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:5000/graphql",
  }),
  cache: new InMemoryCache(),
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
          PostProvider,
          UserProvider,
          ModeProvider,
          TimeLimitProvider,
        ]}
      >
        <App />
      </Compose>
    </ChakraProvider>
  </ApolloProvider>,
  rootElement
);
