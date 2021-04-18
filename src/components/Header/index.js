import styles from './header.module.scss';
import { Flex } from '@chakra-ui/react';

export function Header({ children, classname }) {
  return (
    <Flex className={classname ? classname : styles['header']}>{children}</Flex>
  );
}
