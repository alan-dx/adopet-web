import { Flex, Box, Text, Avatar } from '@chakra-ui/react';
import Head from 'next/head';

import { Header } from '../../components/Header';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { setupApiClient } from '../../services/api';

export default function Details() {
  return (
    <>
      <Head>
        <title>Detalhes | AdoPet</title>
      </Head>

      <Header title="Detalhes" />

      <Flex
        as="section"
        w="full"
        maxW={975}
        direction="column"
        align="center"
        bg="white"
        px={[4, 8]}
        py={[8, 4]}
        mt={[16, 8]}
        borderRadius="xl"
        mx="auto"
      >
        <Flex
          flexDirection="row"
          w="100%"
          alignItems="center"
        >
            <Avatar size="md" name={'name'} src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" />
            <Text color="gray.700" fontWeight="medium" ml={4}>John Doe</Text>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  const {id} = ctx.params

  const api = setupApiClient(ctx)

  const response = await api.get(`/donations/${id}`)

  console.log('donation detail', response.data)

  return {
    props: {

    }
  }
})