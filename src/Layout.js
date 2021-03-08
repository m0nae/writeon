import { Box, Button, Spacer } from "@chakra-ui/react";
import {
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { gql, useMutation } from "@apollo/client";

import { CREATE_POST } from "./gql.js";
import { Header } from "./components/Header";
import { NewPostContext } from "./contexts/NewPostContext";
import { SearchContext } from "./contexts/SearchContext";
import {Redirect} from "react-router-dom";
import { generatePath } from "react-router";
import writeOn from "./components/Header/writeon.svg";

export function Layout({ children }) {
  const { newPost, setNewPost } = useContext(NewPostContext);
  const { setSearchInput, searchBarFocused, setSearchBarFocused } = useContext(SearchContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const postTitleInput = useRef();
  const [createPost, {error: createPostError, loading, data, called }] = useMutation(CREATE_POST, {
    onCompleted: (createPost) => {

      if (!createPostError) {
       onClose();
      }
      
      setNewPost({id: createPost.createPost._id});
      
    }
  });

  async function createNewPost() {
    const newTitle = postTitleInput.current.value.toString();
    
    createPost({ variables: { title: newTitle } });
  }

  function handleInput(e) {
    setSearchInput(e.target.value);
  }

  return (
    <>
    { called && data && <Redirect push to={generatePath("/write/:id", {
      id: data.createPost._id
    }
    )} /> }
      <Header>
        <Box as="a" href="http://localhost:3000/" className="logo">
          <img src={writeOn} className="writeOn" />
        </Box>
        <Spacer />
        <InputGroup width="70%">
            <Input 
              placeholder="Search" 
              bg="#efefef" 
              border="none" 
              width="70%" 
              maxW="1000px" 
              m="0 auto" 
              size="lg"
              onChange={(e) => handleInput(e)}
              onFocus={(e) => setSearchBarFocused(true)}
              onBlur={(e) => setSearchBarFocused(false)}
              _focus={{
                backgroundColor: "#ffffff",
                shadow: "xs"
              }} 
            />
          </InputGroup>
        <Spacer />
        <Box>
          <Button onClick={onOpen}>Create New</Button>
        </Box>
      </Header>
      <div className="container">
        {children}
      </div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered >
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
            {createPostError && <p>Error: Please try again.</p>}
            {loading && <p>Loading...</p>}
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
