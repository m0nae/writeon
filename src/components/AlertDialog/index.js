import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  Button
} from "@chakra-ui/react";

export function AlertDialog(props) {
  const {
    isOpen,
    leastDestructiveRef,
    onClose,
    isCentered,
    deleteAlertRef,
    closeDeleteAlert,
    handleDelete
  } = props;

  return (
    <>
      <ChakraAlertDialog
        isOpen={isOpen}
        leastDestructiveRef={leastDestructiveRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be undone!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={deleteAlertRef} onClick={closeDeleteAlert}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </ChakraAlertDialog>
    </>
  )
}