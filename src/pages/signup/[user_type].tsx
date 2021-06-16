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
import { FiMail, FiLock, FiArrowLeft, FiUser } from 'react-icons/fi'
import { ActionButton } from '../../components/ActionButton'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'

interface SignUpProps {
  user_type:string
}

export default function SignUp({user_type = 'user'}: SignUpProps) {

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true
  })

  useEffect(() => {
    console.log(user_type)
  }, [])
  
  return (
    <>
      <Head>
        <title>Cadastro | AdoPet</title>
      </Head>
      <Flex
        height="100vh"
        width="100vw"
      >
        {
          isDesktop && (
            <Flex
              flex="1"
              align="center"
            >
              <Image
                boxSize="fit-content"
                objectFit="cover"
                src="/signup-hero.svg"
                alt="Logo"
              />
            </Flex>
          )
        }
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
            <Input placeholder="Nome" type="text" icon={FiUser} />
            <Input placeholder="E-mail" type="email" icon={FiMail} />
            <Input placeholder="Senha" type="password" icon={FiLock} />
            <ActionButton>
              Entrar
            </ActionButton>
          </VStack>
          <Link href="/" passHref>
            <ChakraLink mt={["10", "20"]} color="gray.50">
              {<Icon as={FiArrowLeft} mr="1" />}Fazer login
            </ChakraLink>
          </Link>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
  
  const {user_type} = params
  console.log(user_type)
  
  return {
    props: {
      user_type
    }
  }

}