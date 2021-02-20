// import React, { createContext, useEffect, useState } from 'react';
// import { gql, useQuery } from '@apollo/client';

// export const PostContext = createContext({});

// const GET_ALL_POSTS = gql`
//   {
//     posts {
//       title
//       htmlContent
//     }
//   }
// `;

// export function PostProvider(props) {
//   const { loading, error, data } = useQuery(GET_ALL_POSTS);
//   let [posts, setPosts] = useState([]);

//   //TODO: implement error handling
//   useEffect(() => {
//     if (loading === false && data) {
//       setPosts(
//         data.posts.map((post) => {
//           return {
//             id: post._id,
//             title: post.title,
//             body: post.htmlContent
//           };
//         })
//       );
//     }

//     console.log(posts);
//   }, [data]);

//   // This should be taking from the current user's "createdPosts" in the DB and displaying them

//   // If there are no posts, display something like "You haven't written any posts yet."
//   /* 
//   if (data.posts.length === 0) {
//     <p>You haven't written any posts yet.</p>
//   }
//   */

//   let [savedPosts, setSavedPosts] = useState([]);

//   useEffect(() => {
//     if (savedPosts && savedPosts.length > 0) {
//       localStorage.setItem('saved posts', JSON.stringify(savedPosts));
//     } else {
//       console.log(`There are no new saved posts (prior to refresh).`);
//     }
//   }, [savedPosts]);

//   // ^^^^^^^^ ALSO ADD POSTS AS A DEPENDENCY SO WHENEVER POSTS IS UPDATED (AND A POST IS DELETED FOR EXAMPLE), SAVEDPOSTS WILL DELETE THE REMOVED POST FROM THERE TOO
//   // If there are no saved posts, display "You haven't saved any posts yet."
//   // !!!!MOVE SAVED POSTS TO DB INSTEAD OF LOCALSTORAGE!!!!
//   useEffect(() => {
//     if (localStorage.getItem('saved posts')) {
//       if (JSON.parse(localStorage.getItem('saved posts')).length > 0) {
//         setSavedPosts(JSON.parse(localStorage.getItem('saved posts')));
//       }
//     } else {
//       console.log('There is no local storage.');
//     }
//   }, []);

//   // useEffect(() => {
//   //   const getPosts = async () => {
//   //     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   //     const data = await res.json();
//   //     setPosts(data);
//   //   };

//   //   getPosts();
//   // }, []);

//   return (
//     <PostContext.Provider
//       value={{
//         posts: posts,
//         setPosts: setPosts,
//         savedPosts: savedPosts,
//         setSavedPosts: setSavedPosts
//       }}
//     >
//       {props.children}
//     </PostContext.Provider>
//   );
// }
