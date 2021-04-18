import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Loading } from "../Loading";
import { Redirect } from "react-router-dom";

export function Logout() {
  // const [redirect, setRedirect] = useState(false);
  const { user, setUser, loading } = useContext(UserContext);

  //todo: if server error, display that error to user. but for now, dont get responses or anything

  useEffect(() => {
    if (user) {
      fetch("https://writeon-app.herokuapp.com/logout", {
        credentials: "include",
      });
      setUser(false);
    } else {
      return;
    }
  }, [user]);

  //todo: if user is NULL, just render the LOADING PAGE (that's it, don't make the GET request)

  return <>{<Redirect push to="/login" />}</>;
}
