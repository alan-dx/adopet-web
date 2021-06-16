import { Button, Text } from '@chakra-ui/react'

interface ActionButtonProps {
  children: string
}

export function ActionButton({children}: ActionButtonProps) {
  return (
    <Button
      bg="green.300"
      w="100%"
      _hover={{
        background: "green.500",
        transition: "background 0.5s"
      }}
    >
      <Text color="gray.50" >{children}</Text>
    </Button>
  )
}