import React from 'react'

import { Box, Heading, Center, Button } from "@chakra-ui/react"
import { Header } from "../components/Header";

export function NotFound() {
  return (
    <>
      <Center h="100vh">
        <Box>
          <Center><span style={{ fontSize: "3rem" }}>😲</span></Center>
          <Heading size="xl">Page Not Found!</Heading>
          <p>Let's go somewhere else now, shall we?</p>
          <Center><Button bg="#000" color="#fff">Home</Button></Center>
        </Box>
      </Center>
    </>
  )
}
