import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Spinner
} from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { GET_ALL_POSTS } from "../gql";
import { Layout } from "../Layout";
import { MdList } from "react-icons/md";
import { ModeContext } from "../contexts/ModeContext";
import { NoteCard } from "../components/NoteCard";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

export function Home(props) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const history = useHistory();
  const { initialState, modeDispatch } = useContext(ModeContext);

  const [gridView, setGridView] = useState(true);

  const {error: allPostsError, loading: allPostsLoading, data: allPostsData, refetch: refetchAllPosts} = useQuery(GET_ALL_POSTS, {
    onCompleted: (GET_ALL_POSTS) => {
      setPosts(GET_ALL_POSTS.posts);
      setLoading(false);
      console.log(GET_ALL_POSTS.posts);
    },
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  // useEffect(() => {
  //   refetchAllPosts();
  // }, [])

  // useEffect(() => {
  //   refetchAllPosts();
  // }, [props.location])

  return (
    <>
      {loading ? 
      (
        <Center mt="50vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )
      :
      (
        <Layout>
          <Box
            className="home-layout"
          >
          
              
          <Flex mb="1rem" className="view-menu">
            <Box marginLeft="auto">
              <MdList onClick={() => setGridView(!gridView)} className="list-view-icon" />
            </Box>
          </Flex>
          <Box className={gridView ? "grid-view" : "list-view"}>
              { posts && posts.map((post) => {
                
                return <NoteCard
                  key={post._id} 
                  _id={post._id}
                  title={post.title}
                  textContent={post.textContent && post.textContent}
                  // onClick={onClick}
                />
              })
              }
            </Box>
         
          </Box>
        </Layout>
      )}
      </>
  );
}
