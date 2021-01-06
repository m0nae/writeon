import React, { useContext } from 'react';
import { Post } from '../../Posts';
import { Layout } from '../../Pages';
import { PostContext } from '../../../PostContext';

export function Saved() {
  return (
    <Layout>
      <SavedPosts />
    </Layout>
  );
}

function SavedPosts() {
  let { savedPosts, setSavedPosts } = useContext(PostContext);

  return savedPosts.map((post) => (
    <Post key={post.id} id={post.id} title={post.title} body={post.body} />
  ));
}
