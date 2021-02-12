import React, { useContext, useEffect } from "react";

import { Layout } from "../../Pages";
import { NewPostContext } from "../../../NewPostContext";
import { Posts } from "../../Posts";
import { UserContext } from "../../../UserContext";
import { useHistory } from "react-router-dom";

export function Home() {
  const { user } = useContext(UserContext);
  const { newPost, setNewPost } = useContext(NewPostContext);
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
