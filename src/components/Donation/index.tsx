import { Flex, Avatar, Text, Progress, Icon } from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';

interface DonationProps {
  src: string;
  name: string;
  description: string;
  progress: number;
}

const Donation = ({ src, name, progress, description }: DonationProps) => {
  return (
    <Flex
      w='full'
      bg='white'
      borderRadius='md'
      boxShadow='md'
      p={4}
      align='center'
    >
      <Avatar size='md' src={src} name={name} />

      <Flex direction='column' ml={4} position='relative' width='full'>
        <Text fontSize='md' color='gray.700' fontWeight='bold'>
          {name}
        </Text>

        <Text fontSize='sm' color='gray.500' noOfLines={1} mb={[2, 4]} pr={4}>
          {description}
        </Text>

        <Icon
          position='absolute'
          right={0}
          boxSize={6}
          top='50%'
          transform='translateY(-50%)'
          color='gray.400'
          as={FiChevronRight}
        />

        <Progress
          size='sm'
          borderRadius='sm'
          colorScheme='green'
          value={progress}
        />
      </Flex>
    </Flex>
  );
};

export { Donation };
