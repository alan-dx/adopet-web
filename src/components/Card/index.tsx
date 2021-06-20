import {
  Box,
  Flex,
  Avatar,
  Text,
  AspectRatio,
  Image,
  IconButton,
  Button,
  Divider,
} from '@chakra-ui/react';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import { ActionButton } from '../ActionButton';

interface CardProps {
  avatar: string;
  name: string;
  postedIn: string;
  image: string;
  description: string;
  isFeed?: boolean;
}

const Card = ({
  avatar,
  name,
  postedIn,
  image,
  description,
  isFeed,
}: CardProps) => {
  return (
    <Box bg="white" width="full" borderRadius="md" boxShadow="xl">
      <Flex direction="column" py={4}>
        <Flex as="header" align="center" justify="space-between" px={4}>
          <Flex align="center">
            <Avatar size="md" name={name} src={avatar} />
            <Text color="gray.700" fontWeight="medium" ml={4}>
              {name}
            </Text>
          </Flex>

          <Text color="gray.500">{postedIn} min</Text>
        </Flex>

        {isFeed && (
          <Text fontSize="sm" color="gray.500" px={4} noOfLines={1}>
            {description}
          </Text>
        )}

        <AspectRatio
          ratio={4 / 2}
          borderY="1px"
          borderColor="gray.200"
          my={[2, 4]}
        >
          <Image objectFit="cover" src={image} alt="Animal image" />
        </AspectRatio>

        {isFeed ? (
          <Flex align="center" justify="space-between" px={[2, 4]}>
            <Flex align="center">
              <IconButton
                variant="ghost"
                aria-label="Like"
                icon={<FiHeart />}
              />
              <Text color="gray.500">35</Text>

              <IconButton
                ml={4}
                color="gray.500"
                variant="ghost"
                aria-label="Share"
                icon={<FiShare2 />}
              />
            </Flex>

            <Button bg="purple.500" color="gray.50" px={8}>
              Adotar
            </Button>
          </Flex>
        ) : (
          <Box px={4}>
            <Text as="span" color="gray.500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              enim eaque blanditiis minus eum distinctio itaque rerum, dicta
              esse repellendus aperiam maiores, non earum eos sint. Nulla
              laborum est saepe at perferendis sint. Sit distinctio velit
              aliquid magnam atque commodi facere, expedita nobis numquam
              veritatis voluptatem cumque earum sed animi.
            </Text>

            <Divider my={4} />

            <Box maxW={400} mx="auto">
              <ActionButton>Adotar</ActionButton>
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export { Card };
