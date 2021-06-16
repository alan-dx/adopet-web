import {
  Container,
  Flex,
  Text,
  Avatar,
  AspectRatio,
  Image,
  IconButton,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FiHeart, FiShare2 } from "react-icons/fi";

const Card = () => {
  return (
    <Container bg="white" maxW="full" borderRadius="md" p="0">
      <Flex direction="column" py="4">
        <Flex align="center" justify="space-between" px="4">
          <Flex align="center">
            <Avatar
              size="md"
              name="Abrigo Flora e Fauna"
              src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/k-p-1-ae-0036.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b52c28c28aa88a6e524455c80ea9ed85"
            />
            <Text color="gray.700" fontWeight="medium" ml="4">
              Abrigo Flora e Fauna
            </Text>
          </Flex>

          <Text color="gray.500">30 min</Text>
        </Flex>

        <Text fontSize="sm" color="gray.500" px="4" py="2">
          Cleiton e um doguinho muito simpatico e feliz, gosta muito de brincar
          e morder a canela dos outros.
        </Text>

        <AspectRatio ratio={4 / 3}>
          <Image
            src="https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d"
            alt="puppy"
          />
        </AspectRatio>

        <Flex align="center" justify="space-between" px={[2, 4]}>
          <Flex align="center">
            <IconButton variant="ghost" aria-label="Like" icon={<FiHeart />} />
            <Text color="gray.500">35 curtidas</Text>
          </Flex>

          <Flex align="center">
            <Button variant="ghost" aria-label="Share" leftIcon={<FiShare2 />}>
              <Text fontWeight="normal" color="gray.500">
                Compartilhar
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export { Card };
