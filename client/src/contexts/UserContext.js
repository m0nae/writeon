const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN;

import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    setLoading(user === null ? true : false);
  }, [user]);

  useEffect(() => {
    fetch(`${SERVER_DOMAIN}/api/current`, {
      credentials: 'include'
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        loading: loading
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
