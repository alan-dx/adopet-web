import { useCallback, useState } from 'react'
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
  signOutByContext: () => void
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

  // //TESTES DA ROTA REFRESH-TOKEN
  // api.post('refresh-token').then(response => {
  //   console.log(response)
  // }).catch(error => {
  //   console.log(error)
  // })

}

export const AuthContext = createContext({} as AuthContextData )

export function AuthProvider({children}:AuthProviderProps) {

  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    
    const { 'adopet.token': token } = parseCookies()

    // if (token) {
    //     api.get('/profile').then(response => {
    //       const { name, email, id, isOng, avatarURL } = response.data
    //       console.log(name)
  
    //       setUser({
    //         id,
    //         name,
    //         email,
    //         isOng,
    //         avatarURL
    //       })
    //     }).catch(error => {
    //       console.log(error)
    //     })
    // }
  }, [])

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
        isOng: false, //REMOVER
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