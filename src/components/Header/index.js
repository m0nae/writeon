import styles from "./header.module.scss";
import { Flex } from "@chakra-ui/react";
import React from "react";

// import {CreateNewHeaderComponent} from "./CreateNewHeader";

export function Header({ children }) {
  return (
    <Flex className={styles['header']}>
      {children}
    </Flex>
  );
}

// export function CreateNewHeader({children}, props) {
//   return (
//     <CreateNewHeaderComponent {...props}>
//       {children}
//     </CreateNewHeaderComponent>
//   )
// }