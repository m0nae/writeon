import { Flex } from "@chakra-ui/react";
import React from "react";

export function Header({ children }) {
  return (
    <>
      <Flex p="4" justify="center" align="center" className="header">
        {children}
      </Flex>
    </>
  );
}
