import { Flex, Image, Text } from '@chakra-ui/react'
import { FiHome, FiUser } from 'react-icons/fi'
import { UserTypeButton } from '../components/UserTypeButton'

export default function Home() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      px="6"
      bg="purple.500"
      flexDir={["column", "row"]}
      align="center"
      justify="center"
    >
      <Image
        boxSize="fit-content"
        objectFit="cover"
        src="/logo.svg"
        alt="Logo"
      />
      <Text
        mt="12"
        alignSelf="flex-start"
        color="gray.50"
        fontSize="md"
        fontWeight="400"
      >
        Seja bem-vindo,
      </Text>
      <Text textStyle="h2" alignSelf="flex-start">Vamos realizar seu cadastro?</Text>
      <Flex
        flexDir="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <UserTypeButton
          bg="purple.200"
          icon={FiUser}
        >
          Pessoa Física
        </UserTypeButton>
        <UserTypeButton
          bg="green.300"
          icon={FiHome}
        >
          ONG
        </UserTypeButton>
      </Flex>
    </Flex>
  )
}
