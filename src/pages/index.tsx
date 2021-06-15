import { Flex, Image } from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      bg="purple.500"
    >
      <Image
        boxSize="fit-content"
        objectFit="cover"
        src="url(src/public/logo.svg)"
        alt="Logo"
      />
    </Flex>
  )
}
