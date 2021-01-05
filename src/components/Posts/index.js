import React, { useEffect, useState, useContext } from 'react';
import { FiHeart } from 'react-icons/fi';
import { PostContext } from '../../PostContext';

export function Posts() {
  let { posts, setPosts, savedPosts, setSavedPosts } = useContext(PostContext);
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

export function Post(props) {
  let [saved, setSaved] = useState(false);
  let [savedPosts, setSavedPosts] = props.savedPost;
  let currentPost = {
    id: props.id,
    title: props.title,
    body: props.body,
    saved: props.saved
  };

  if (savedPosts && savedPosts.find((post) => post === post.id && !saved)) {
    setSaved(true);
  }

  function handleClick(e) {
    setSaved(!saved);

    if (!saved) {
      setSavedPosts([...savedPosts, currentPost]);
    } else if (saved) {
      setSavedPosts(currentPost);
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
