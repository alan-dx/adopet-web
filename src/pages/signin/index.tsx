import { 
  Flex, 
  Image, 
  VStack, 
  useBreakpointValue, 
  Link as ChakraLink, 
  Text,
  Icon
} from '@chakra-ui/react'
import Link from 'next/link'
import { Input } from '../../components/Input'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import { ActionButton } from '../../components/ActionButton'
import Head from 'next/head'

export default function SignIn() {

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true
  })
  
  return (
    <>
      <Head>
        <title>Login | AdoPet</title>
      </Head>
      <Flex
        height="100vh"
        width="100vw"
      >
        <Flex
          flexDir="column"
          flex="1"
          height="100%"
          px="6"
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
          <VStack spacing={4} mt={isDesktop ? "16" : "12"} w={["64","80","90"]}>
            <Input placeholder="E-mail" type="email" icon={FiMail} />
            <Input placeholder="Senha" type="password" icon={FiLock} />
            <ActionButton>
              Entrar
            </ActionButton>
            <Link href="/" passHref>
              <ChakraLink color="gray.50">
                Esqueci minha senha
              </ChakraLink>
            </Link>
          </VStack>
          <Link href="/" passHref>
            <ChakraLink mt={["10", "20"]} color="gray.50">
              {<Icon as={FiLogIn} mr="1" />}Criar Conta
            </ChakraLink>
          </Link>
        </Flex>
        {
          isDesktop && (
            <Flex
              flex="1"
              align="center"
            >
              <Image
                boxSize="fit-content"
                objectFit="cover"
                src="/signin-hero.svg"
                alt="Logo"
              />
            </Flex>
          )
          }
      </Flex>
    </>
  )
}