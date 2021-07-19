import config from '../config';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    setLoading(user === null ? true : false);
  }, [user]);

  useEffect(() => {
    fetch(config.CURRENT_USER, {
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
