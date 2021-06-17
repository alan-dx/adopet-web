import { Button, Text, ButtonProps } from '@chakra-ui/react'

export function ActionButton({children, ...rest}: ButtonProps) {
  return (
    <Button
      bg="green.300"
      w="100%"
      _hover={{
        background: "green.500",
        transition: "background 0.5s"
      }}
      {...rest}
    >
      <Text color="gray.50" >{children}</Text>
    </Button>
  )
}