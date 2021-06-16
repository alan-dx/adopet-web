import {
  Grid,
  Flex,
  Text,
  Icon,
  ButtonGroup,
  Button,
  Center,
  Avatar,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiPlus, FiPower } from "react-icons/fi";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const isDesktop = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Grid
      py="4"
      as="header"
      templateColumns="repeat(3, 1fr)"
      px="8"
      bg="purple.500">
      <Flex align="center">
        <Avatar
          size="md"
          src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
          name="Della Case"
        />
        {isDesktop && (
          <Text fontSize="xl" color="gray.50" ml="4">
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
        size={isDesktop ? "md" : "sm"}
        spacing="2"
        ml="auto"
        my="auto">
        {isDesktop ? (
          <Button
            variant="solid"
            bg="whiteAlpha.900"
            _hover={{ bg: "whiteAlpha.700" }}
            rightIcon={<FiPlus />}>
            <Text px="4" color="gray.600">
              Novo post
            </Text>
          </Button>
        ) : (
          <Button variant="unstyled" _hover={{ bg: "purple.400" }}>
            <Icon as={FiPlus} boxSize={6} color="gray.50" />
          </Button>
        )}
        <Button variant="unstyled" _hover={{ bg: "purple.400" }}>
          <Icon as={FiPower} boxSize={6} color="gray.50" />
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

export { Header };
