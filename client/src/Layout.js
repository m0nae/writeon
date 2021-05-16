const CLIENT_DOMAIN = process.env.REACT_APP_CLIENT_DOMAIN;
import React, { useContext, useRef, useState } from 'react';
import styles from './layout.module.scss';
import {
  Box,
  Button,
  Center,
  createStandaloneToast,
  Divider,
  IconButton,
  Input,
  InputGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { FiPlusCircle } from 'react-icons/fi';
import { generatePath } from 'react-router';
import { Redirect } from 'react-router-dom';
import { NewPostContext } from './contexts/NewPostContext';
import { SearchContext } from './contexts/SearchContext';
import { Header } from './components/Header';
import writeOn from './components/Header/writeon.svg';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from './gql.js';

export function Layout({ children }) {
  const [redirectToLogout, setRedirectToLogout] = useState(false);
  const { setNewPost } = useContext(NewPostContext);
  const { setSearchInput, setSearchBarFocused } = useContext(SearchContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const postTitleInput = useRef();
  const [
    createPost,
    { error: createPostError, loading, data, called }
  ] = useMutation(CREATE_POST, {
    onCompleted: (createPost) => {
      onClose();
      setNewPost({ id: createPost.createPost._id });
    }
  });

  async function createNewPost() {
    //todo: throw in an OnChange. if title length is < x, disable the button. but once long enough, enable the "Create note" button
    const newTitle = postTitleInput.current.value.toString();

    createPost({ variables: { title: newTitle } });
  }

  function handleInput(e) {
    setSearchInput(e.target.value);
  }

  //todo: change the localhost 3000 link here and everywhere else in the code

  return (
    <>
      {called && data && (
        <Redirect
          push
          to={generatePath('/write/:id', {
            id: data.createPost._id
          })}
        />
      )}
      {redirectToLogout && <Redirect push to="/logout" />}
      <Header className={styles['header']}>
        <Box as="a" href={`${CLIENT_DOMAIN}`} className="logo">
          <img src={writeOn} className={styles['writeon']} />
        </Box>
        <InputGroup width="50%">
          <Input
            placeholder="Search"
            bg="#efefef"
            border="none"
            width="100%"
            maxW="1000px"
            m="0 auto"
            size="lg"
            onChange={(e) => handleInput(e)}
            onFocus={() => setSearchBarFocused(true)}
            onBlur={() => setSearchBarFocused(false)}
            _focus={{
              backgroundColor: '#ffffff',
              shadow: 'xs'
            }}
          />
        </InputGroup>
        <Box>
          <button
            aria-label="Create Note"
            onClick={onOpen}
            className={styles['create-new-btn']}
          >
            Create Note
          </button>
          <FiPlusCircle className={styles['create-new-btn-mobile']} />
          <Menu>
            <MenuButton
              as={IconButton}
              variant="unstyled"
              icon={<BsThreeDots />}
              className={styles['header-menu-btn']}
            >
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setRedirectToLogout(true)}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Header>
      <div className={styles['container']}>{children}</div>

      <Modal
        size="sm"
        initialFocusRef={postTitleInput}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Note</ModalHeader>
          <Divider style={{ width: '90%', margin: '0 auto' }} />
          <ModalCloseButton />
          <ModalBody>
            <div style={{ marginTop: '1rem' }}>
              {!loading ? (
                <div>
                  <p>Title</p>
                  <Input ref={postTitleInput} size="lg" />

                  {createPostError && (
                    <p className={styles['modal-error']}>
                      There was an error creating your note. Please try again.
                    </p>
                  )}
                </div>
              ) : (
                <Center>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    color="#9e9e9e"
                    size="xl"
                  />
                </Center>
              )}
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
