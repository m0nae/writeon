import React, { createContext, useEffect, useState } from "react";

import { gql } from "@apollo/client";

export const UserContext = createContext({});

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!user);

  // for now, the loading state is dependent on whether or not a user exists. but what if an error is thrown by the fetch request? set loading state to false and just display the error on the page/redirect to an error page or however u want to handle it
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

  // ^ USE ASYNC/AWAIT TRY/CATCH

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
