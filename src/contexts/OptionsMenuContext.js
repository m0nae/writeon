import React, { createContext, useRef, useState } from 'react';
import { createStandaloneToast } from '@chakra-ui/react';

const deletePostErrorToast = createStandaloneToast();

export const OptionsMenuContext = createContext();

export function OptionsMenuProvider(props) {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const closeDeleteAlert = () => setIsDeleteAlertOpen(false);
  const deleteAlertRef = useRef();

  const deletePostErrorT = () =>
    deletePostErrorToast({
      title: 'An error has occured.',
      description: 'There was an issue deleting your note. Please try again.',
      status: 'error',
      duration: 5000,
      isClosable: true
    });

  return (
    <OptionsMenuContext.Provider
      value={{
        isDeleteAlertOpen: isDeleteAlertOpen,
        setIsDeleteAlertOpen: setIsDeleteAlertOpen,
        closeDeleteAlert: closeDeleteAlert,
        deleteAlertRef: deleteAlertRef,
        deletePostErrorT: deletePostErrorT
      }}
    >
      {props.children}
    </OptionsMenuContext.Provider>
  );
}
