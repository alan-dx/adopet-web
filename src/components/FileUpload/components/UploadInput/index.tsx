import { ReactNode, useRef } from 'react';
import { InputGroup } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface UploadInputProps {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
}

const UploadInput = ({
  register,
  accept,
  multiple,
  children,
}: UploadInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={'file'}
        multiple={multiple}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
};

export { UploadInput };
