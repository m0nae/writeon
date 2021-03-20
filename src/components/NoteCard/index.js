import styles from './note-card.module.scss'
import {
  Box,
  LinkBox,
  LinkOverlay,
  Center,
  Flex,
  SimpleGrid,
  Spinner
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { generatePath } from "react-router";

import Truncate from 'react-truncate';

import { OptionsMenu } from '../OptionsMenu';

export function NoteCard({ title, textContent, onClick, _id, gridView, setClickedPostId, onAlertClick }) {
  const [redirectToPost, setRedirectToPost] = useState(false);

  function handlePostClick(e) {
    setRedirectToPost(true);
  }

  return (
    <>
    {redirectToPost && <Redirect push to={generatePath("/write/:id", {
      id: _id
    })} />}
      <Box
        className={'notecard'}
        onClick={(e) => handlePostClick(e)}
      >
        <div className={styles['home-note-menu-container']} >
        
        
        <OptionsMenu 
          menuIcon={<BsThreeDots className={styles['menu-icon']} />} 
          menuButton={'menu-icon-two'}
          _id={_id}
          setClickedPostId={() => setClickedPostId(_id)}
        />
        </div>

        <Box 
          as="h2"
          className={styles['title']}
        >
          {title}
        </Box>
        <Box
          className={styles['content']}
        >
          <Truncate lines={gridView ? 7 : 4} width={gridView ? 0 : 600}>
          {
          textContent
          }
          </Truncate>
        </Box>
      </Box>
    </>
  )
}