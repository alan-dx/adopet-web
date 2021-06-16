import { 
  Input as ChakraInput, 
  InputGroup, 
  InputLeftElement, 
  Icon,
  InputRightElement,
  Button
} from '@chakra-ui/react'
import { useState, ReactNode, ElementType } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface InputProps {
  placeholder?: string,
  type?: string,
  icon?: ElementType
}

export function Input({type, placeholder, icon}: InputProps) {

  const [show, setShow] = useState(true)

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={icon} color="gray.700" />}
      />
      <ChakraInput
        bg="gray.50"
        fontSize={["xs", "md"]}
        type={type !== "password" ? type : (show ? "password" : "text")}
        placeholder={placeholder}
        color="gray.700"
      />
      {
        type == 'password' && (
          <InputRightElement mr="1">
            <Button h="1.75rem" size="sm" bg="gray.200" onClick={() => {setShow(!show)}}>
              {show ? <Icon as={FiEye} color="gray.700" /> : <Icon as={FiEyeOff} color="gray.700" />}
            </Button>
          </InputRightElement>
        )
      }
  </InputGroup>
  )
}