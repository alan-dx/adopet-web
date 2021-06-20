import { Flex, Box, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import Head from "next/head";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { setupApiClient } from "../../services/api";

const Feed = () => {
  return (
    <>
      <Head>
        <title>Feed | AdoPet</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Box pos={["fixed", "unset"]} w="100%" zIndex="10">
          <Header title="AdoPet" />
        </Box>

        <VStack px={[4, 8]} py="8" spacing={[4, 8]} mt={[16, 0]}>
          <Card />
        </VStack>
      </Flex>
    </>
  );
};

export const getServerSideProps = withSSRAuth(async (ctx) => {

  //TODO: fazer as requisições de listagem do feed

  // const response = await api.get('/profile').then(res => {
  //   const { name } = res.data
  //   console.log(name)
  // })

  const api = setupApiClient(ctx)

  const response = await api.get('/profile').then(res => {
    console.log(res.data.name)
  }).catch(error => {
    console.log('erro na rota /profile', error.response.data)
  })

  return {
    props: {
      
    }
  }
})

export default Feed;
