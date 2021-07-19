import config from '../../config';
import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Redirect } from 'react-router-dom';

export function Logout() {
  const { user, setUser, loading } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetch(config.LOGOUT, {
        credentials: 'include'
      });
      setUser(false);
    } else {
      return;
    }
  }, [user]);

  return <>{<Redirect push to="/" />}</>;
}
