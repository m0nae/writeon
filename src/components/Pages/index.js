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
import React, { useContext, useRef } from "react";
import { gql, useMutation } from "@apollo/client";

import { Header } from "../Header";
import { NewPostContext } from "../../NewPostContext";
import {Redirect} from "react-router-dom";
import { generatePath } from "react-router";
import writeOn from "../Header/writeon.svg";

const CREATE_POST = gql`
  mutation ($title: String!) {
    createPost(title: $title) {
       
        _id
        title
        dateCreated
        
        

    }
}
`;

export function Layout({ children }) {
  const { newPost, setNewPost } = useContext(NewPostContext);
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

  return (
    <>
    { called && data && <Redirect to={generatePath("/write/:id", {
      id: data.createPost._id
    }
    )} /> }
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
