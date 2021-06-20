import { AuthTokenError } from './errors/AuthTokenError';
import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthContext'

let isRefreshing = false
let failedRequestsQueue = []

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['adopet.token']}`
    },
    withCredentials: true
  })
    
  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {

    if (error.response.status === 401) {
      if (error.response.data?.message === 'Invalid JWT token.') {
        cookies = parseCookies(ctx)//AC

        const originalConfig = error.config

        if (!process.browser) {//cookies httpOnly are not sent by default on requests made by the next server-side
          api.defaults.headers.Cookie = `rtid=${cookies.rtid};uid=${cookies.uid}`
        }

        if (!isRefreshing) {
          isRefreshing = true

          api.post('refresh-token')
          .then((response => {
            const {token} = response.data

            if (!process.browser) {

              const rtid = response.headers['set-cookie'][0].split(";")
              const setRtid = rtid[0].slice(5)

              setCookie(ctx, 'rtid', setRtid, {//update rtid httponly cookie
                maxAge: 60*60*24*30,
                path: '/',
                httpOnly: true,
                sameSite: 'Lax',
                secure: false
              })
            }

            setCookie(ctx, 'adopet.token', token, {
              maxAge: 60*60*24*30,
              path: '/'
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            failedRequestsQueue.forEach(request => request.onSuccess(token))
            failedRequestsQueue = []
          })).catch(error => {
            failedRequestsQueue.forEach(request => request.onSuccess(error))
            failedRequestsQueue = []
            
            if (process.browser) {
              signOut()
            }
          }).finally(() => {
            isRefreshing = false
          })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (error: AxiosError) => {
              reject(error)
            }
          })
        })

      } else {
        if (process.browser) {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
    }

    return Promise.reject(error)
  })


  return api
} 
