import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Saved, Home, CreateNew } from './components/Pages';
import { PostProvider, PostContext } from './PostContext';
import './styles.css';

export default function App() {
  return (
    <PostProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/saved">
              <Saved />
            </Route>
            <Route path="/create-new">
              <CreateNew />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </PostProvider>
  );
}
