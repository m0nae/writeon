import styles from "./layout.module.scss";
import { Box, Button, Spacer } from "@chakra-ui/react";
import {
  Center,
  Divider,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlinePencilAlt } from "react-icons/hi"
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

    if (createPostError) {
      createPostErrorToast({
        title: "An error has occurred.",
        description: "There was an issue creating your note. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
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
      <Header className={styles['header']}>
        <Box as="a" href="http://localhost:3000/" className="logo">
          <img src={writeOn} className={styles['writeon']} />
        </Box>
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
        {/* <Spacer /> */}
        <Box>
          <IconButton aria-label="Create New Note" title="Create New Note" isRound icon={<HiOutlinePencilAlt />} onClick={onOpen} />
        </Box>
      </Header>
      <div className={styles['container']}>
        {children}
      </div>

      <Modal size="sm" initialFocusRef={postTitleInput} isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Note</ModalHeader>
          <Divider style={{ width: "90%", margin: "0 auto" }} />
          <ModalCloseButton />
          <ModalBody>
            <div style={{ marginTop: "1rem" }}>
            {!loading ? 
              <div>
              <p>Title</p>
              <Input ref={postTitleInput} size="lg" />
              {createPostError && <p>Error: Please try again.</p>}
              </div>
              :
              
              <Center>
                <Spinner 
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="black"
                  size="xl"
                />
              </Center>
              
            }
            </div>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => createNewPost()} colorScheme="blue">
              Create Note
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
      <div className={styles['wrapper']}>{props.children}</div>
    </>
  );
}

import { createStandaloneToast } from "@chakra-ui/react";
const createPostErrorToast = createStandaloneToast();
