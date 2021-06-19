import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

let isRefreshing = false

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['adopet.token']}`
    },
    withCredentials: true
  })
    
  // api.interceptors.response.use(response => {
  //   console.log('inteceptor success')
  //   return response
  // }, (error: AxiosError) => {
  //   console.log('inteceptor error')

  //   if (error.response.status === 401) {
  //     if (error.response.data?.message === 'Invalid JWT token.') {
  //       cookies = parseCookies(ctx)//AC

  //       const originalConfig = error.config

  //       if (!isRefreshing) {
  //         isRefreshing = true

  //         api.post('refresh-token')
  //         .then((response => {
  //           console.log('sucesso na rota de refresh', response.data)

  //           setCookie(ctx, 'adopet.token', response.data.token, {
  //             maxAge: 60*60*24*30,
  //             path: '/'
  //           })

  //           api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`

  //         })).catch(error => {
  //           console.log('erro na rota de refresh', error)
  //         })

  //       }

  //     } else {
  //       console.log(error.response.data?.message)
  //     }
  //   }
  // })


  return api
} 
