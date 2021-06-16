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


export default function SignIn() {

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true
  })
  
  return (
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
        <VStack spacing={4} mt={isDesktop ? "16" : "12"} w={["68","80","90"]}>
          <Input placeholder="E-mail" type="email" icon={FiMail} />
          <Input placeholder="Senha" type="password" icon={FiLock} />
          <ActionButton>
            Entrar
          </ActionButton>
          <ChakraLink color="gray.50">
            <Link href="/signup">Esqueci minha senha</Link>
          </ChakraLink>
        </VStack>
        <ChakraLink mt={["10", "20"]} color="gray.50">
          <Link href="/signup">Criar Conta</Link> {<Icon as={FiLogIn} />}
        </ChakraLink>
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
  )
}