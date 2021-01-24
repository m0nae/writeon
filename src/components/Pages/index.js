import React, { useState } from 'react';
import { Navbar } from '../Navbar';
import Login from '../Login';

export function Layout(props) {
  const [showLogin, setShowLogin] = useState(false);
  function handleShowLogin() {
    setShowLogin(!showLogin);
  }

  return (
    <>
      <Navbar handleShowLogin={handleShowLogin} />
      <div className="container">
        <h1>The Blog.</h1>
        {showLogin && <Login />}
        {props.children}
      </div>
    </>
  );
}
