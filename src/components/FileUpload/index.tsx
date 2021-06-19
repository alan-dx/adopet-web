import {
  Flex,
  Avatar,
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  AspectRatio,
  Image,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FieldError, useWatch, Control } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';

import { UseFormRegisterReturn } from 'react-hook-form';

import { UploadInput } from './UploadInput';

interface ImageUploadProps {
  register: UseFormRegisterReturn;
  control: Control;
  error?: FieldError;
  multiple?: boolean;
  avatar?: string;
}

const ImageUpload = ({
  register,
  control,
  error = null,
  multiple = false,
  avatar,
}: ImageUploadProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const watchImages = useWatch({ control, name: 'image' });

  useEffect(() => {
    if (watchImages) {
      const selectedImages = Array.from(watchImages);

      const selectedImagesPreview = selectedImages.map((image) => {
        return URL.createObjectURL(image);
      });

      setPreviewImages(selectedImagesPreview);
    }
  }, [watchImages]);

  return (
    <FormControl isInvalid={!!error}>
      {!avatar && (
        <FormLabel color="gray.600" textAlign="center">
          {'Adicionar foto'}
        </FormLabel>
      )}

      {previewImages.length !== 0 && !avatar && (
        <Stack direction="row" overflowX="scroll" spacing={4}>
          {previewImages?.map((image) => (
            <AspectRatio key={image} ratio={4 / 3} flex={1} minWidth="xs">
              <Image src={image} borderRadius={8} />
            </AspectRatio>
          ))}
        </Stack>
      )}

      {!!error && (
        <FormErrorMessage fontSize="x-small" color="red.400">
          {error.message}
        </FormErrorMessage>
      )}

      <Flex mt={[4, 8]} mb={4} justify="center">
        <UploadInput accept={'image/*'} multiple={multiple} register={register}>
          {avatar ? (
            <Avatar
              bg="gray.300"
              size="2xl"
              src={previewImages[0] ?? avatar}
              _hover={{ border: '2px solid #adadad', cursor: 'pointer' }}
            />
          ) : (
            <Button
              bg="gray.300"
              textColor="gray.600"
              width="full"
              leftIcon={<Icon as={FiUpload} />}
            >
              Adicionar
            </Button>
          )}
        </UploadInput>
      </Flex>
    </FormControl>
  );
};

export { ImageUpload };
