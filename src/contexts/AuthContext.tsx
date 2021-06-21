import { useToast } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import {createContext, ReactNode} from 'react'
import Router from 'next/router'
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import { useEffect } from 'react'
import { api } from '../services/apiClient'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOutByContext: () => void;
  setUser?: Dispatch<SetStateAction<User>>;
}

type User = {
  id: string;
  name: string;
  email: string;
  isOng?: boolean;
  avatarURL?: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
  isOng: boolean
}

export function signOut() {
  destroyCookie(
    undefined,
    'adopet.token',
    {
      path: '/'
    }
  )

  Router.push('/signin')

}

export const AuthContext = createContext({} as AuthContextData )

export function AuthProvider({children}:AuthProviderProps) {

  const [user, setUser] = useState<User>(null)
  const toast = useToast()

  useEffect(() => {
    
    const { 'adopet.token': token } = parseCookies()

    if (token) {
        api.get('/profile').then(response => {
          const { name, email, id, isOng, avatarURL } = response.data
  
          setUser({
            id,
            name,
            email,
            isOng,
            avatarURL
          })
        }).catch(error => {
          console.log(error)
          signOut()
        })
    }
  }, [])

  const signIn = useCallback(async ({email, password}: SignInCredentials)  => {
    try {

      const response = await api.post('authenticate', {
        email,
        password
      })

      const {token, user: { id, name, avatarURL, isOng }} = response.data

      setUser({
        id,
        name,
        email,
        isOng,
        avatarURL
      })

      setCookie(
        undefined,
        'adopet.token',
        token,
        {
          maxAge: 60 * 60 * 24 * 30, //30 days
          path: '/'
        }
      )

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/feed')
    } catch (error) {
      const { status } = error?.response

      if (status == 401) {
        toast({
          title: 'Verifique os dados!',
          description: 'A senha/e-mail informados não estão corretos!',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
      
    }
  }, [])

  const signUp = useCallback(async ({name, email, password, isOng }: SignUpCredentials) => {
    try {
      await api.post('/users', {
        name,
        email,
        password,
        isOng
      })

      Router.push('/signin')

      toast({
        title: 'Usuário cadastrado!',
        description: 'Sua conta foi criada com sucesso.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

    } catch (error) {

      const { status } = error.response

      if (status == 409) {
        toast({
          title: 'Ops!...',
          description: 'Já existe uma conta cadastrada neste e-mail.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Ops!...',
          description: 'Houve um problema ao realizar seu cadastrado, tente novamente mais tarde.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });

      }
      
    }
  }, [])

  const signOutByContext = useCallback(signOut, [])

  return (
    <AuthContext.Provider value={{user, signIn, signUp, signOutByContext, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}