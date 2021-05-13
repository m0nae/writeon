const SERVER_DOMAIN = process.env.SERVER_DOMAIN || `http://localhost:5000`;
import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Redirect } from 'react-router-dom';

export function Logout() {
  const { user, setUser, loading } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetch(`${SERVER_DOMAIN}/api/logout`, {
        credentials: 'include'
      });
      setUser(false);
    } else {
      return;
    }
  }, [user]);

  return <>{<Redirect push to="/" />}</>;
}
