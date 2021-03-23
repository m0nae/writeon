import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!user);

  //todo: the code below should still work as intended
  useEffect(() => {
    setLoading(user === null ? true : false);
  }, [user]);

  useEffect(() => {
    fetch('http://localhost:5000/current', {
      credentials: 'include'
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
