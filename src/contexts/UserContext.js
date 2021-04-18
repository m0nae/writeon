import React, { createContext, useEffect, useState } from "react";

import { gql } from "@apollo/client";

export const UserContext = createContext({});

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!user);

  //todo: the code below should still work as intended
  useEffect(() => {
    setLoading(user === null ? true : false);
  }, [user]);

  useEffect(() => {
    fetch("https://writeon-app.herokuapp.com/current", {
      credentials: "include",
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
        loading: loading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
