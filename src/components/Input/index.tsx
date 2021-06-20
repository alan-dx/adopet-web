import {
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  Icon,
  InputRightElement,
  Button,
  FormControl,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from '@chakra-ui/react';
import {
  useState,
  forwardRef,
  ElementType,
  ForwardRefRenderFunction,
} from 'react';
import { FieldError } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { string } from 'yup/lib/locale';

interface InputProps extends ChakraInputProps {
  name: string;
  icon?: ElementType;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, type, icon, error = null, ...rest },
  ref
) => {
  const [show, setShow] = useState(true);

  return (
    <FormControl isInvalid={!!error}>
      <InputGroup>
        {icon && (
          <InputLeftElement
            data-testid="input-with-icon"
            pointerEvents="none"
            children={<Icon as={icon} color="gray.700" />}
          />
        )}
        <ChakraInput
          aria-label={name}
          name={name}
          bg="gray.50"
          fontSize={['xs', 'md']}
          type={type !== 'password' ? type : show ? 'password' : 'text'}
          color="gray.700"
          ref={ref}
          {...rest}
        />
        {type == 'password' && (
          <InputRightElement mr="1">
            <Button
              data-testid="show-password-button"
              h="1.75rem"
              size="sm"
              bg="gray.200"
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? (
                <Icon as={FiEye} color="gray.700" />
              ) : (
                <Icon
                  as={FiEyeOff}
                  color="gray.700"
                  data-testid="hide-password-icon"
                />
              )}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      {!!error && (
        <FormErrorMessage fontSize="x-small" color="red.400">
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
