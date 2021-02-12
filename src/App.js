import "./styles.css";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserContext, UserProvider } from "./UserContext";

import { CreateNew } from "./components/Pages/CreateNew";
import { Home } from "./components/Pages/Home";
import { Login } from "./components/Login";
import { PostProvider } from "./PostContext";
import { Saved } from "./components/Pages/Saved";

export default function App() {
  const { user } = useContext(UserContext);
  const newestPost = useState(null);

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
