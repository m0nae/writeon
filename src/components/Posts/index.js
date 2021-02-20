// import React, { useEffect, useState, useRef, useContext } from 'react';
// import { FiHeart } from 'react-icons/fi';
// import { PostContext } from '../../PostContext';

// export function Posts() {
//   let { posts, setPosts, savedPosts, setSavedPosts } = useContext(PostContext);
//   return posts.map((post) => (
//     <Post key={post.id} id={post.id} title={post.title} body={post.body} />
//   ));
// }

// export function Post(props) {
//   let [saved, setSaved] = useState(false);
//   let { savedPosts, setSavedPosts } = useContext(PostContext);
//   let currentPost = {
//     id: props.id,
//     title: props.title,
//     body: props.body
//   };

//   useEffect(() => {
//     if (
//       savedPosts &&
//       savedPosts.find((post) => post.id === currentPost.id && !saved)
//     ) {
//       setSaved(true);
//     }
//   }, [savedPosts]);

//   function otherPosts() {
//     return savedPosts.filter((el) => el.id !== currentPost.id);
//   }

//   function handleClick(e) {
//     setSaved(!saved);

//     if (!saved) {
//       setSavedPosts([...savedPosts, currentPost]);
//     } else if (saved) {
//       setSavedPosts(otherPosts());
//     }
//   }

//   return (
//     <div className="post">
//       <h2>{props.title}</h2>
//       <p>{props.body}</p>
//       <FiHeart
//         className={`heart-icon${saved ? ' saved' : ''}`}
//         onClick={handleClick}
//       />
//     </div>
//   );
// }
