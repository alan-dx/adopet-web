import { 
  Flex, 
  Image, 
  VStack, 
  useBreakpointValue, 
  Link as ChakraLink, 
  Icon
} from '@chakra-ui/react'
import Link from 'next/link'
import { Input } from '../../components/Input'
import { FiMail, FiLock, FiArrowLeft, FiUser, FiHome, FiCheckCircle } from 'react-icons/fi'
import { ActionButton } from '../../components/ActionButton'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
}

interface SignUpProps {
  user_type:string
}

const signUpFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória').min(6, 'Ao mínimo 6 caracteres'),
  cPassword: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas não conferem!')
})

export default function SignUp({user_type = 'user'}: SignUpProps) {

  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    resolver: yupResolver(signUpFormSchema)
  })

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true
  })

  const handleSignUp: SubmitHandler<SignUpFormData> = async (values, event) => {
    console.log({isOng: user_type == 'user' ? false : true, ...values})
    return new Promise(resolve => setTimeout(resolve, 2000))
  }
  
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
          as="form"
          onSubmit={handleSubmit(handleSignUp)}
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
          <VStack spacing={3} mt={isDesktop ? "8" : "6"} w={["64","80","90"]}>
            <Input 
              placeholder={user_type == 'user' ? "Nome" : "Nome da Ong"} 
              type="text" 
              icon={user_type == 'user' ? FiUser : FiHome}
              error={errors.name}
              {...register('name')}
            />
            <Input
              placeholder="E-mail"
              type="email"
              icon={FiMail} 
              error={errors.email}
              {...register('email')}
            />
            <Input
              placeholder="Crie uma senha"
              type="password"
              icon={FiLock}
              error={errors.password}
              {...register('password')}
            />
            <Input
              placeholder="Confirme a senha"
              type="password"
              icon={FiCheckCircle}
              error={errors.cPassword}
              {...register('cPassword')}
            />
            <ActionButton 
              type="submit"
              isLoading={isSubmitting}
            >
              Entrar
            </ActionButton>
          </VStack>
          <Link href="/" passHref>
            <ChakraLink mt={["4", "8"]} color="gray.50">
              {<Icon as={FiArrowLeft} mr="1" />} Voltar
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