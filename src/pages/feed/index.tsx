import { Flex, VStack } from '@chakra-ui/react';
import Head from 'next/head';

import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { Donation } from '../../components/Donation';

import { setupApiClient } from '../../services/api';
import { withSSRAuth } from '../../utils/withSSRAuth';

const Feed = () => {
  return (
    <>
      <Head>
        <title>Feed | AdoPet</title>
      </Head>

      <Header title='AdoPet' />

      <Flex
        as='main'
        direction='column'
        align='center'
        w='full'
        maxW={975}
        mx='auto'
      >
        <VStack
          as='section'
          w='full'
          px={[4, 8]}
          py={[8, 4]}
          spacing={4}
          mt={[16, 0]}
        >
          <Donation
            src='https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e'
            name='Abrigo Proteger'
            progress={20}
            description='Precisamos de doação para um cirurgia em'
          />

          <Card />
        </VStack>
      </Flex>
    </>
  );
};

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//TODO: fazer as requisições de listagem do feed

// const response = await api.get('/profile').then(res => {
//   const { name } = res.data
//   console.log(name)
// })

// const api = setupApiClient(ctx)

//Requisição pelo SERVER SIDE do next
// const response = await api.post('/refresh-token').then(res => {
//   console.log('sucesso')
// }).catch(error => {
//   console.log('erro na rota profile', error.response.data)
// })

//   return {
//     props: {},
//   };
// });

export default Feed;
