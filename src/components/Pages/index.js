import React, { useContext } from 'react';
import { Navbar } from '../Navbar';
import { Posts, Post } from '../Posts';
import { PostContext } from '../../PostContext';

export function Home() {
  return (
    <Layout>
      <Posts />
    </Layout>
  );
}

export function Users() {
  return <p>This is the users page</p>;
}

function Layout(props) {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>The Blog.</h1>
        {props.children}
      </div>
    </>
  );
}

export function Saved() {
  return (
    <Layout>
      <SavedPosts />
    </Layout>
  );
}

function SavedPosts() {
  let { posts, setPosts, savedPosts, setSavedPosts } = useContext(PostContext);
  return (
    posts &&
    posts.map((post) => (
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.body}
        saved={savedPosts.find((el) => el === post.id) ? true : false}
        savedPost={[savedPosts, setSavedPosts]}
      />
    ))
  );
}
