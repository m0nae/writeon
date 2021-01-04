import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';

export function Posts() {
  let [posts, setPosts] = useState([]);
  let [savedPosts, setSavedPosts] = useState([]);
  // let [savedPostsStorage, setSavedPostsStorage] = useState([]);

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

  return posts.map((post) => (
    <Post
      key={post.id}
      id={post.id}
      title={post.title}
      body={post.body}
      saved={savedPosts.find((el) => el === post.id) ? true : false}
      savedPost={[savedPosts, setSavedPosts]}
    />
  ));
}

// function AllPosts() {
//   return (
//     <Posts>

//     </Posts>
//   )
// }

function Post(props) {
  let [saved, setSaved] = useState(false);
  let [savedPosts, setSavedPosts] = props.savedPost;
  let id = props.id;

  if (savedPosts && savedPosts.find((post) => post === id && !saved)) {
    setSaved(true);
  }

  function handleClick(e) {
    setSaved(!saved);
    let currentPost = id;

    if (!saved) {
      setSavedPosts([...savedPosts, currentPost]);
    } else if (saved) {
      setSavedPosts(savedPosts.filter((post) => post !== currentPost));
    }
  }

  return (
    <div className="post">
      <h2>{props.title}</h2>
      <p>{props.body}</p>
      <FiHeart
        className={`heart-icon${saved ? ' saved' : ''}`}
        onClick={handleClick}
      />
    </div>
  );
}
