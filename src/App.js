import "./styles.scss";

import { Center, Spinner } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { CreateNew } from "./pages/CreateNew";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserContext } from "./contexts/UserContext";

export default function App() {
  const { user, loading } = useContext(UserContext);

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
            <ProtectedRoute
              exact
              path="/write/:id"
              user={user}
              component={CreateNew}
            />
            <ProtectedRoute exact path="/" user={user} component={Home} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      )}
    </div>
  );
}
