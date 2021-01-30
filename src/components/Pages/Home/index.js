import React, { useContext, useEffect } from "react";
import { Posts } from "../../Posts";
import { Layout } from "../../Pages";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../UserContext";

export function Home() {
  const { user } = useContext(UserContext);
  const history = useHistory();

  console.log(`USER VALUE ON HOME PAGE IS: ${user}`);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user]);

  return (
    <Layout>
      <Posts />
    </Layout>
  );
}
