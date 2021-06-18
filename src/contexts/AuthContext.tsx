import { useCallback, useState } from 'react'
import {createContext, ReactNode} from 'react'
import Router from 'next/router'
import { api } from '../services/api'
import { setCookie, destroyCookie } from 'nookies'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOutByContext: () => void
}

type User = {
  id: string;
  name: string;
  email: string;
  avatarURL?: string
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

  const signIn = useCallback(async ({email, password}: SignInCredentials)  => {
    try {

      const response = await api.post('authenticate', {
        email,
        password
      })

      const {token, user: { id, name, avatarURL }} = response.data

      setUser({
        id,
        name,
        email,
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
      const { status } = error.response

      if (status == 401) {
        alert('Email ou senha incorretos!')
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

      alert('Usuário cadastrado com sucesso!')

    } catch (error) {

      const { status } = error.response

      if (status == 409) {
        alert('Este e-mail já está sendo utilizado em outra conta.')
      } else {
        alert('Houve um erro ao realizar seu cadastro, tente novamente mais tarde!')
      }
      
    }
  }, [])

  const signOutByContext = useCallback(signOut, [])

  return (
    <AuthContext.Provider value={{user, signIn, signUp, signOutByContext}}>
      {children}
    </AuthContext.Provider>
  )
}