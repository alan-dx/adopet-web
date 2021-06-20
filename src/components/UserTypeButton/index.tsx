import { Button, Text, ButtonProps, Icon } from '@chakra-ui/react';
import { ReactNode, ElementType } from 'react';

interface UserTypeButtonProps extends ButtonProps {
  children: ReactNode;
  icon?: ElementType;
}

export function UserTypeButton({
  icon,
  children,
  ...rest
}: UserTypeButtonProps) {
  return (
    <Button {...rest}>
      {icon && (
        <Icon
          data-testid="button-with-icon"
          as={icon}
          color="gray.50"
          boxSize={10}
        />
      )}
      <Text textStyle="h2" mt="5">
        {children}
      </Text>
    </Button>
  );
}
