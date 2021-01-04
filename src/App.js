import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Users, Home } from './components/Pages';

import './styles.css';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/saved">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
