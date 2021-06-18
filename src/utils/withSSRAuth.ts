import { parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export function withSSRAuth(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    
    const cookies = parseCookies(ctx)

    if (!cookies['adopet.token']) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (error) {
      console.log(error)      
    }
  }
}