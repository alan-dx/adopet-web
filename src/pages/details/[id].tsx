import { Flex } from '@chakra-ui/react';
import Head from 'next/head';

import { Header } from '../../components/Header';
import { Card } from '../../components/Card';

function Details() {
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
        px={[4, 8]}
        py={[8, 4]}
        mt={[16, 0]}
        mx="auto"
      >
        <Card
          name="Abrigo Flora e Fauna"
          image="https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d"
          postedIn="30"
          description="Cleiton e um doguinho muito simpatico e feliz e gosta muito de brincar
          e morder a canela dos outros."
          avatar="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/k-p-1-ae-0036.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b52c28c28aa88a6e524455c80ea9ed85"
        />
      </Flex>
    </>
  );
}

export default Details;
