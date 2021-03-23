import React, { createContext, useState } from 'react';

export const NewPostContext = createContext({});

export function NewPostProvider(props) {
  const [newPost, setNewPost] = useState(null);

  return (
    <NewPostContext.Provider
      value={{
        newPost: newPost,
        setNewPost: setNewPost
      }}
    >
      {props.children}
    </NewPostContext.Provider>
  );
}
