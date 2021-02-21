import React, { createContext, useEffect, useState } from "react";

import { gql } from "@apollo/client";

export const UserContext = createContext({});

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    setLoading(user === null ? true : false);
  }, [user]);

  useEffect(() => {
    fetch("http://localhost:5000/current", {
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
        loading: loading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
