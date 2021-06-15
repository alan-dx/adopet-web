import { Button, Text, ButtonProps, Icon } from '@chakra-ui/react'
import { ReactNode, ElementType } from 'react'

interface UserTypeButtonProps extends ButtonProps {
  children: ReactNode;
  icon?: ElementType
}

export function UserTypeButton({icon, children, ...rest}:UserTypeButtonProps) {
  return (
    <Button
      flexDir="column"
      boxSize={36}
      mt="12"
      {...rest}
    >
      {icon && <Icon as={icon} color="gray.50" boxSize={10} />}
      <Text textStyle="h2" mt="5" >{children}</Text>
    </Button>
  )
}