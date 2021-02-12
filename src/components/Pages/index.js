import { Box, Button, Spacer } from "@chakra-ui/react";
import {
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";

import { Header } from "../Header";
import { Login } from "../Login";
import { NewPostContext } from "../../NewPostContext";
import writeOn from "../Header/writeon.svg";

export function Layout({ children }) {
  const { newPost, setNewPost } = useContext(NewPostContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const postTitleInput = useRef();

  function createNewPost() {
    // create a new post/execute a gql mutation
    // the mutation should return a newPost type, so take the info from that and store it in the "newPost" state from the NewPostContext
    console.log(postTitleInput.current.value);
    // then redirect user
  }

  return (
    <>
      <Header>
        <Box className="logo">
          <img src={writeOn} className="writeOn" />
        </Box>
        <Spacer />
        <Box>
          <Button onClick={onOpen}>Create New</Button>
        </Box>
      </Header>
      <div className="container">
        <h1>The Blog.</h1>

        {children}
      </div>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Post</ModalHeader>
          <Divider style={{ width: "90%", margin: "0 auto" }} />
          <ModalCloseButton />
          <ModalBody>
            <div style={{ marginTop: "1rem" }}>
              <p>Post Title</p>
              <Input ref={postTitleInput} size="lg" />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => createNewPost()} colorScheme="blue">
              Create Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export function CreateNewLayout(props) {
  return (
    <>
      <div className="wrapper">{props.children}</div>
    </>
  );
}
