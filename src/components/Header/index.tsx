import {
  Box,
  Flex,
  Grid,
  Text,
  Icon,
  ButtonGroup,
  Button,
  Center,
  Avatar,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { FiPlus, FiPower } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';

import { ModalNewPost } from '../Modal/NewPost';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const { signOutByContext } = useContext(AuthContext);

  const isDesktop = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Box as="header" pos={['fixed', 'unset']} w="full" top={0} zIndex={10}>
      <Flex bg="purple.500" justify="center">
        <Grid
          templateColumns="repeat(3, 1fr)"
          w="full"
          maxW={975}
          py={4}
          px={8}
        >
          <Flex align="center">
            <Avatar
              size="md"
              src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
              name="Della Case"
            />
            {isDesktop && (
              <Text fontSize="xl" color="gray.50" ml={4}>
                Della Case
              </Text>
            )}
          </Flex>

          <Center>
            <Text fontSize="xl" fontWeight="bold" color="gray.50">
              {title}
            </Text>
          </Center>

          <ButtonGroup
            size={isDesktop ? 'md' : 'sm'}
            spacing={2}
            my="auto"
            ml="auto"
          >
            {isDesktop ? (
              <Button
                variant="solid"
                bg="whiteAlpha.900"
                _hover={{ bg: 'whiteAlpha.700' }}
                rightIcon={<FiPlus />}
                onClick={() => onOpen()}
              >
                <Text px={4} color="gray.600">
                  Novo post
                </Text>
              </Button>
            ) : (
              <Button
                variant="unstyled"
                _hover={{ bg: 'purple.400' }}
                onClick={() => onOpen()}
              >
                <Icon as={FiPlus} boxSize={6} color="gray.50" />
              </Button>
            )}
            <Button
              onClick={signOutByContext}
              variant="unstyled"
              _hover={{ bg: 'purple.400' }}
            >
              <Icon as={FiPower} boxSize={6} color="gray.50" />
            </Button>
          </ButtonGroup>
        </Grid>

        <ModalNewPost isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
  );
};

export { Header };
