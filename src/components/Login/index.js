import React, { useContext, useEffect } from "react";

import { UserContext } from "../../UserContext";
import { useHistory } from "react-router-dom";

export function Login() {
  const history = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);

  return (
    <>
      <form action="http://localhost:5000/login" method="POST">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <input type="submit" value="Login" />
      </form>
    </>
  );
}
