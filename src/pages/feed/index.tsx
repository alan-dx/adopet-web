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

      <Header title="AdoPet" />

      <Flex
        as="main"
        direction="column"
        align="center"
        w="full"
        maxW={975}
        mx="auto"
      >
        <VStack
          as="section"
          w="full"
          px={[4, 8]}
          py={[8, 4]}
          spacing={4}
          mt={[16, 0]}
        >
          <Donation
            src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
            name="Abrigo Proteger"
            progress={20}
            description="Precisamos de doação para um cirurgia em"
          />

          <Card
            name="Abrigo Flora e Fauna"
            image="https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d"
            postedIn="30"
            description="Cleiton e um doguinho muito simpatico e feliz e gosta muito de brincar
          e morder a canela dos outros."
            avatar="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/k-p-1-ae-0036.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b52c28c28aa88a6e524455c80ea9ed85"
            isFeed
          />
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
