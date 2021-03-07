import {
  Center,
  CircularProgress,
  CircularProgressLabel,
  Spinner,
} from "@chakra-ui/react";

export function Loading() {
  return (
    <>
    <Center mt="50vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="black"
        size="xl"
      />
    </Center>
    </>
  )
}