import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Saved } from "./components/Pages/Saved";
import { Home } from "./components/Pages/Home";
import { CreateNew } from "./components/Pages/CreateNew";
import { Login } from "./components/Login";
import { PostProvider } from "./PostContext";
import { UserProvider, UserContext } from "./UserContext";
import "./styles.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

export default function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/saved">
            <Saved />
          </Route>
          <Route path="/create-new">
            <CreateNew />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
