import styles from './note-card.module.scss'
import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Spinner
} from "@chakra-ui/react";
import React, { useState } from "react";

import { Redirect } from "react-router-dom";
import { generatePath } from "react-router";

export function NoteCard({ title, textContent, onClick, _id }) {
  const [redirectToPost, setRedirectToPost] = useState(false);

  function handlePostClick() {
    setRedirectToPost(true);
  }

  return (
    <>
    {redirectToPost && <Redirect push to={generatePath("/write/:id", {
      id: _id
    })} />}
      <Box
        className={styles['notecard']}
        onClick={() => handlePostClick()}
      >
        <Box 
          as="h2"
          className={styles['title']}
        >
          {title}
        </Box>
        <Box
          className={styles['content']}
        >
          
          {
          textContent
          }
          
        </Box>
      </Box>
    </>
  )
}