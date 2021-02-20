import "./styles.css";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client";
import { Center, Spinner } from "@chakra-ui/react";
import { Link, Route, BrowserRouter as Router, Switch, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserContext, UserProvider } from "./UserContext";

import { CreateNew } from "./components/Pages/CreateNew";
import { Home } from "./components/Pages/Home";
import { Login } from "./components/Login";
import { NewPostContext } from "./NewPostContext";
import { PostProvider } from "./PostContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Saved } from "./components/Pages/Saved";

export default function App() {
  const { user, loading } = useContext(UserContext);
  const { newPost, setNewPost } = useContext(NewPostContext);
  

  return (
    <div className="App">
      {loading ? (
        <Center mt="50vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            {/* <ProtectedRoute exact path="/saved" user={user} component={Saved} /> */}
            <ProtectedRoute
              exact
              path="/write/:id"
              user={user}
              component={CreateNew}
            />
            <ProtectedRoute exact path="/" user={user} component={Home} />
          </Switch>
        </Router>
      )}
    </div>
  );
}
