import styles from "./home.module.scss";

import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Select,
  Spinner
} from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { GET_ALL_POSTS } from "../../gql";
import { Layout } from "../../Layout";
import { MdList } from "react-icons/md";
import { RiLayoutGridFill } from "react-icons/ri";
import { HiSortDescending, HiSortAscending } from "react-icons/hi";
import { ModeContext } from "../../contexts/ModeContext";
import { NoteCard } from "../../components/NoteCard";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { Loading } from "../Loading";
import { SearchContext } from "../../contexts/SearchContext";

export function Home(props) {
  const { user } = useContext(UserContext);
  const { initialState, modeDispatch } = useContext(ModeContext);
  const { searchBarFocused } = useContext(SearchContext);

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const history = useHistory();

  const [gridView, setGridView] = useState(true);
  const [sortBy, setSortBy] = useState("dateModified");
  const [sortOrder, setSortOrder] = useState("descending");

  const {error: allPostsError, loading: allPostsLoading, data: allPostsData, refetch: refetchAllPosts} = useQuery(GET_ALL_POSTS, {
    onCompleted: (GET_ALL_POSTS) => {
      console.log('get all posts query ran');
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

  function sortPosts(a, b, property) {
    if (property === "title") {
      let firstElem = a.title.toUpperCase();
      let secondElem = b.title.toUpperCase();
  
      if (firstElem < secondElem) {
        return (sortOrder === "ascending" ? -1 : 1);
      }
  
      if (firstElem > secondElem) {
        return (sortOrder === "ascending" ? 1 : -1);
      }
      return 0;
    } else {
      let date1 = new Date(a[property]);
      let date2 = new Date(b[property]);
      return (sortOrder === "ascending" ? date1 - date2 : date2 - date1);
    }
  }

 
  
  useEffect(() => {

    
      if (posts) {
    
        switch (sortBy) {
          case ("title"):
            let sortedTitles = posts.slice().sort((a, b) => sortPosts(a, b, "title"))
            
            setPosts(sortedTitles);
            break;
          case ("dateCreated"):
            let sortedCreatedDates = posts.slice().sort((a, b) => sortPosts(a, b, "dateCreated"))
            console.log(sortedCreatedDates);
            setPosts(sortedCreatedDates);
            break;
          case ("dateModified"):
            let sortedModifiedDates = posts.slice().sort((a, b) => sortPosts(a, b, "dateModified"))
            console.log(sortedModifiedDates);
            setPosts(sortedModifiedDates);
            break;
          default: 
            break;
        }
      }
    
  }, [sortBy, sortOrder])


  return (
    <>
      {loading ? 
      (
        <Loading />
      )
      :
      (
        <Layout>
          <Box
            className="home-layout"
          >
          
              
          <Flex mb="1rem" justifyContent="flex-end" className="view-menu">
            <Select 
            width="180px" 
            justifySelf="end" 
            mr="1rem" 
            
            onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="dateModified">Date Last Edited</option>
              <option value="title">Title</option>
              <option value="dateCreated">Date Created</option>
            </Select>
            <Box
              onClick={sortOrder === "ascending" ? () => setSortOrder("descending") : () => setSortOrder("ascending")}
            >
              {sortOrder === "ascending" 
              ? <HiSortAscending aria-label="Ascending" title="Ascending" className={styles['ascending-icon']} />
              : <HiSortDescending aria-label="Descending" title="Descending" className={styles['ascending-icon']}
              />
            }
            </Box>
            <Box>
              {
                gridView ? <RiLayoutGridFill aria-label="Grid view" title="Grid view" onClick={() => setGridView(!gridView)} className={styles['grid-view-icon']} /> :
                <MdList aria-label="List view" title="List view" onClick={() => setGridView(!gridView)} className={styles['list-view-icon']} />
              }
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
