import styles from "../header.module.scss";
import {
  Flex,
  Box,
  Spacer,
  HStack,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent
} from "@chakra-ui/react";

export function CreateNewHeaderComponent({children}) {
  return (
    <Flex className={styles['create-new']}>
        {children}
    </Flex>
  )
}