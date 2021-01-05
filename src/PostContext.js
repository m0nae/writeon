import React, { useState, useEffect, createContext } from 'react';

export const PostContext = createContext({});

export function PostProvider(props) {
  let [posts, setPosts] = useState([]);
  let [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    if (savedPosts && savedPosts.length > 0) {
      localStorage.setItem('saved posts', JSON.stringify(savedPosts));
    } else {
      console.log(`There are no new saved posts (prior to refresh).`);
    }
  }, [savedPosts]);

  useEffect(() => {
    if (localStorage.getItem('saved posts')) {
      setSavedPosts(JSON.parse(localStorage.getItem('saved posts')));
    } else {
      console.log('There is no local storage.');
    }
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts: posts,
        setPosts: setPosts,
        savedPosts: savedPosts,
        setSavedPosts: setSavedPosts
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}
