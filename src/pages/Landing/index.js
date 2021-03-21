import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Loading } from "../Loading";
import { Redirect } from "react-router-dom";


export function Landing() {
const { user, loading } = useContext(UserContext);

  return (
    <>{ user && <Redirect push to="/dashboard" /> }
      {loading ? (<Loading />) : 
        (<p>This is the landing page</p>)
      }
    </>
  )
}