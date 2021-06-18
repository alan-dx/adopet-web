import {
  Box,
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

import { UploadInput } from './components/UploadInput';

interface ImageUploadProps {
  register: UseFormRegisterReturn;
  control: Control;
  error?: FieldError;
  multiple?: boolean;
}

const ImageUpload = ({
  register,
  control,
  error = null,
  multiple = false,
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
      <FormLabel color='gray.600' textAlign='center'>
        {'Adicionar foto'}
      </FormLabel>

      {previewImages.length !== 0 && (
        <Stack direction='row' overflow='scroll' spacing={4}>
          {previewImages?.map((image) => (
            <AspectRatio key={image} ratio={4 / 3} flex={1} minWidth='xs'>
              <Image src={image} borderRadius={8} />
            </AspectRatio>
          ))}
        </Stack>
      )}

      {!!error && (
        <FormErrorMessage fontSize='x-small' color='red.400'>
          {error.message}
        </FormErrorMessage>
      )}

      <Box mt={[4, 8]}>
        <UploadInput accept={'image/*'} multiple={multiple} register={register}>
          <Button
            bg='gray.300'
            textColor='gray.600'
            width='full'
            leftIcon={<Icon as={FiUpload} />}
          >
            Upload
          </Button>
        </UploadInput>
      </Box>
    </FormControl>
  );
};

export { ImageUpload };
