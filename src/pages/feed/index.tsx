import { Flex, VStack, Button, Spinner } from '@chakra-ui/react';
import Head from 'next/head';

import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { Donation } from '../../components/Donation';

import { setupApiClient } from '../../services/api';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { useInfiniteQuery } from 'react-query';
import { api } from '../../services/apiClient';
import { useMemo } from 'react';
import { CardsList } from '../../components/CardsList';

const Feed = ({donations}) => {

  const { 
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    'donations',
    async ({pageParam = 0}) => {
      const response = await api.get('/feeds', {
        params: {
          limit: 4,
          page: pageParam
        }
      })

      return response.data
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.links.next) {
          return null
        }

        return lastPage.links.next.slice(-1)
      },
      initialData: donations
    }
  )

  const formattedData = useMemo(() => {
    return data?.pages?.map(page => page.results).flat()
  }, [data])

  if (isLoading) {
    return <Spinner size="xl" />
  }

  return (
    <>
      <Head>
        <title>Feed | AdoPet</title>
      </Head>

      <Header title="AdoPet" isFeed />

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
          {
            isLoading
            ?
              <Spinner size="sm" color="gray.700" />
            :
            (
              <>
                <Donation
                  src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                  name="Abrigo Proteger"
                  progress={20}
                  description="Precisamos de doação para um cirurgia em"
                />
      
                <CardsList data={formattedData} />
              </>
            )
          }

        </VStack>
        {
          hasNextPage
          &&
          <Button
            my={6}
            isLoading={isFetchingNextPage}
            loadingText="Carregando..."
            bg="purple.500"
            color="gray.50"
            _hover={{
              backgroundColor: "purple.600"
            }}
            onClick={() => fetchNextPage()}
            px={6}
          >
            Carregar mais
          </Button>
        }
      </Flex>
    </>
  );
};

export const getServerSideProps = withSSRAuth(async (ctx) => {

  const api = setupApiClient(ctx)
  
  const response = await api.get('/feeds', {
    params: {
      limit: 4
    }
  })

  const donations = response.data

  return {
    props: {
      donations
    },
  }
});

export default Feed;
