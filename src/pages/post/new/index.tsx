import {
  Flex,
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
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiUpload, FiPhone } from 'react-icons/fi';

import { Header } from '../../../components/Header';
import { ActionButton } from '../../../components/ActionButton';
import { FileUpload } from '../../../components/FileUpload';
import { Input } from '../../../components/Input';

import { validateImageFile } from '../../../utils/validateImageFile';

type NewPostData = {
  file_: FileList;
  nome: string;
  description: string;
  phone: string;
};

const NewPost = () => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const watchImages = watch('file_');

  useEffect(() => {
    if (watchImages) {
      const selectedImages = Array.from(watchImages);

      const selectedImagesPreview = selectedImages.map((image) => {
        return URL.createObjectURL(image);
      });

      setPreviewImages(selectedImagesPreview);
    }
  }, [watchImages]);

  const handleSignIn: SubmitHandler<NewPostData> = async (values, event) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Header title='Novo post' />

      <Flex
        direction='column'
        align='center'
        p={[4, 8]}
        bg='white'
        m={[4, 8]}
        borderRadius='md'
      >
        <Stack width='full' mb={[4, 8]}>
          <Input
            placeholder='Nome'
            name='nome'
            type='text'
            error={errors.nome}
            {...register('nome')}
          />
          <Input
            placeholder='Descrição'
            name='description'
            type='text'
            error={errors.description}
            {...register('description')}
          />
          <Input
            placeholder='Número de telefone'
            name='phone'
            type='number'
            icon={FiPhone}
            error={errors.phone}
            {...register('phone')}
          />
        </Stack>

        <FormControl isInvalid={!!errors.file_}>
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

          <Box my={[4, 8]}>
            <FileUpload
              accept={'image/*'}
              multiple
              register={register('file_', { validate: validateImageFile })}
            >
              <Button
                bg='gray.300'
                textColor='gray.600'
                width='full'
                leftIcon={<Icon as={FiUpload} />}
              >
                Upload
              </Button>
            </FileUpload>
          </Box>

          <FormErrorMessage>
            {errors.file_ && errors?.file_.message}
          </FormErrorMessage>
        </FormControl>

        <ActionButton type='submit' isLoading={isSubmitting}>
          Enviar
        </ActionButton>
      </Flex>
    </form>
  );
};

export default NewPost;
