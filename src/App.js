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
import { Loading } from "./pages/Loading";

import { OptionsMenuProvider } from "./contexts/OptionsMenuContext";
import { Landing } from "./pages/Landing";
import { Logout } from "./pages/Logout";

export default function App() {
  const { user, loading } = useContext(UserContext);

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <OptionsMenuProvider>
              <ProtectedRoute
                exact
                path="/write/:id"
                user={user}
                component={
                  CreateNew
                }
              />
              
              {/* TODO: /DASHBOARD will render HOME component, and it will be protected */}
            <ProtectedRoute exact path="/dashboard" user={user} component={Home} />
            <Route exact path="/" component={Landing} />
            </OptionsMenuProvider>
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      )}
    </div>
  );
}
