import { Center, Spinner } from '@chakra-ui/react';

export function Loading() {
  return (
    <>
      <Center mt="50vh">
        <Spinner thickness="4px" speed="0.65s" color="#9e9e9e" size="xl" />
      </Center>
    </>
  );
}
