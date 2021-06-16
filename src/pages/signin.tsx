import { Text, Flex, Image, Input } from '@chakra-ui/react'

export default function SignIn() {
  return (
    <Flex
      w="100vw"
      h="100vh"
    >
      <Flex
        flexDir="column"
        flex="1"
        bg="purple.500"
        align="center"
        justify="center"
      >
        <Image
          boxSize="fit-content"
          objectFit="cover"
          src="/logo.svg"
          alt="Logo"
        />
        {/* Fazer como componente */}
        <Input w="96" placeholder="E-mail" />
      </Flex>
      <Flex
        flex="1"
      >
        <Image
          boxSize="fit-content"
          objectFit="cover"
          src="/signin-hero.svg"
          alt="Logo"
        />
      </Flex>
    </Flex>
  )
}