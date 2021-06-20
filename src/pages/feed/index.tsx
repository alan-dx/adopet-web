import { Flex, VStack } from '@chakra-ui/react';
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

export type DonationPost = {
  id: string;
  title: string;
  description: string;
  animalType: string;
  animalBreed: string;
  createdAt: string;
  age: string;
  images: {
    id: string;
    imageURL: string
  }[];
  wasAdopted: boolean
}

interface FeedProps {
  donations: DonationPost[] 
}

const Feed = ({donations}: FeedProps) => {

  const { 
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    'donations',
    async () => {
      const response = await api.get('/feeds')

      return response.data
    },
    {
      getNextPageParam: (lastpage) => {

        return null
      }
    }
  )

  const formattedData = useMemo(() => {
    return data?.pages.map(page => page.results).flat()
  }, [data])

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

          <CardsList data={formattedData} />

        </VStack>
      </Flex>
    </>
  );
};

export const getServerSideProps = withSSRAuth(async (ctx) => {

  const api = setupApiClient(ctx)
  
  const response = await api.get('/feeds')

  const donations = response.data.results

  return {
    props: {
      donations
    },
  }
});

export default Feed;
