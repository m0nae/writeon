import styles from './header.module.scss';
import { Flex } from '@chakra-ui/react';

export function Header({ children }) {
  return <Flex className={styles['header']}>{children}</Flex>;
}
