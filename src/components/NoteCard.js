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
        // bg="#fdfdfd"
        shadow="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        width="250px"
        maxH="320px"
        p="5"
        mr="20px"
        mb="20px"
        transition="box-shadow 300ms ease"
        _hover={{
          shadow: "md",
          transition: "box-shadow 300ms ease"
        }}
        _active={{
          shadow: "rgb(0 0 0 / 6%) 0px 1px 2px 0px inset"
        }}
        onClick={() => handlePostClick()}
        cursor="pointer"
      >
        <Box 
          as="h2"
          fontWeight="semibold"
          mb="3"
        >
          {title}
        </Box>
        <Box
          maxH="90%"
          overflow="hidden"

        >
          
          {
          textContent
          }
          
        </Box>
      </Box>
    </>
  )
}