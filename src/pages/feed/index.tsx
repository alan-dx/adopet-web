import { Flex, Box, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import Head from "next/head";
import { withSSRAuth } from "../../utils/withSSRAuth";

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

export const getServerSideProps = withSSRAuth(async () => {

  //TODO: fazer as requisições de listagem do feed

  return {
    props: {
      
    }
  }
})

export default Feed;
