import React, { useContext, useEffect } from "react";

import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

export function Login() {
  const history = useHistory();
  const { user } = useContext(UserContext);

  // todo: why not just use <Redirect to="/" /> in the return statement? instead of using a useEffect
  useEffect(() => {
    if (user) {
      history.push("/dashboard");
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
