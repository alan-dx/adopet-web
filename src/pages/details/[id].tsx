import { 
  Flex, 
  Box, 
  Text, 
  Avatar, 
  Divider,
  Image
} from '@chakra-ui/react';
import Head from 'next/head';

import { Header } from '../../components/Header';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { setupApiClient } from '../../services/api';
import { useEffect } from 'react';
import { ActionButton } from '../../components/ActionButton';

type Donation = {
  id: string;
  title: string;
  description: string;
  animalType: string;
  animalBreed: string;
  createdAt: string;
  age: string;
  user: {
    name: string;
    avatarURL: string;
  };
  images: {
    id: string;
    imageURL: string
  }[];
  wasAdopted: boolean
}

interface DetailsProps {
  donation: Donation
}

export default function Details({donation}:DetailsProps) {

  useEffect(() => {
    console.log(donation?.age)
  }, [])
  return (
    <>
      <Head>
        <title>Detalhes | AdoPet</title>
      </Head>

      <Header title="Detalhes" />

      <Flex
        w="full"
        maxW={900}
        direction="column"
        align="center"
        bg="white"
        my={[16, 8]}
        borderRadius="md" 
        boxShadow="xl"
        mx="auto"
      >
        <Flex
          flexDirection="row"
          w="full"
          alignItems="center"
          px={[4, 8]}
          py={[8, 4]}
        >
            <Avatar size="md" name={donation.user.name} src={donation.user.avatarURL} />
            <Text color="gray.700" fontWeight="medium" ml={4}>{donation.user.name}</Text>
        </Flex>
        <Image objectFit="cover" w="100%" maxH="500px" src={donation?.images[0].imageURL} alt="Animal image" />
        <Flex flexDirection="column" px={[4, 8]} py={[8, 4]}>
          <Text as="strong" color="gray.500">Nome: </Text>
          <Divider />
          <Text mb={[2,4]} mt={1} textAlign="justify" lineHeight="4" as="p" color="gray.500">{donation.title}</Text>
          <Text as="strong" color="gray.500">Idade: </Text>
          <Divider />
          <Text mb={[2,4]} mt={1} textAlign="justify" lineHeight="4" as="p" color="gray.500">{donation.age} anos</Text>
          <Text as="strong" color="gray.500">Espécie: </Text>
          <Divider />
          <Text mb={[2,4]} mt={1} textAlign="justify" lineHeight="4" as="p" color="gray.500">{donation.animalType}</Text>
          <Text as="strong" color="gray.500">Raça: </Text>
          <Divider />
          <Text mb={[2,4]} mt={1} textAlign="justify" lineHeight="4" as="p" color="gray.500">{donation.animalBreed}</Text>
          <Text as="strong" color="gray.500">Descrição: </Text>
          <Divider />
          <Text mb={[2,4]} mt={1} textAlign="justify" lineHeight="4" as="p" color="gray.500">{donation.description}</Text>
        </Flex>
        <Box width="80%" pb={[8, 4]}>
          <ActionButton onClick={() => alert('Feature in development')}>
            Entrar em contato
          </ActionButton>
        </Box>
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  const {id} = ctx.params

  const api = setupApiClient(ctx)

  const response = await api.get(`/donations/${id}`)

  return {
    props: {
      donation: response.data
    }
  }
})