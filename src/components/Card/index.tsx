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
  onClick?: () => void;
}

const Card = ({
  avatar,
  name,
  postedIn,
  image,
  description,
  isFeed,
  onClick
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

          <Button onClick={onClick} _hover={{backgroundColor: 'green.600'}} bg="green.300" color="gray.50" px={8}>
            Adotar
          </Button>
        </Flex>
        
      </Flex>
    </Box>
  );
};

export { Card };
