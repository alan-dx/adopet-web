import { Flex, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FiHome, FiUser } from 'react-icons/fi'
import { UserTypeButton } from '../components/UserTypeButton'

export default function Home() {

  function handleUserButton() {
    console.log('user')
  }

  function handleOngButton() {
    console.log('ong')
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      px="6"
      bg="purple.500"
      flexDir={["column", "row"]}
      align="center"
      justify={["center", "space-around"]}
    >
      <Image
        boxSize={["fit-content", "96"]}
        objectFit="cover"
        src="/logo.svg"
        alt="Logo"
      />
      <Flex
        flexDir="column"
      >
        <Text
          mt="12"
          alignSelf="flex-start"
          color="gray.50"
          fontSize="xl"
          fontWeight="400"
        >
          Seja bem-vindo,
        </Text>
        <Text textStyle="h2" alignSelf={["flex-start", "center"]}>Vamos realizar seu cadastro?</Text>
        <Flex
          flexDir="row"
          width="100%"
          alignItems="center"
          justifyContent={["space-between", "space-around"]}
        >
          <UserTypeButton
            bg="purple.200"
            flexDir="column"
            boxSize={36}
            mt="12"
            icon={FiUser}
            onClick={handleUserButton}
          >
            Usuário
          </UserTypeButton>
          <UserTypeButton
            bg="green.300"
            flexDir="column"
            boxSize={36}
            mt="12"
            icon={FiHome}
            onClick={handleOngButton}
          >
            Ong
          </UserTypeButton>
        </Flex>
        <Text
          fontSize="xl"
          textAlign="center"
          mt="16"
          color="gray.50"
          _hover={{
            textDecoration: "underline",
          }}
        >
          <Link href="/signin">
            Já possui conta? Faça o login
          </Link>
        </Text>
      </Flex>
    </Flex>
  )
}
