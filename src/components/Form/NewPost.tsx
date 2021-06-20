import { Flex, Stack, SimpleGrid, Divider } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiPhone } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../services/apiClient';

import { ActionButton } from '../ActionButton';
import { ImageUpload } from '../FileUpload';
import { Input } from '../Input';

interface NewPostProps {
  closeModal: () => void;
}

type NewPostData = {
  images: FileList;
  title: string;
  description: string;
  animalType: string;
  animalBreed: string;
  age: string
};

const NewPost = ({ closeModal }: NewPostProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const formValidations = {
    title: {
      required: 'Nome obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres',
      },
      maxLength: {
        value: 20,
        message: 'Máximo de 20 caracteres',
      },
    },
    description: {
      required: 'Descrição obrigatória',
      maxLength: {
        value: 400,
        message: 'Máximo de 400 caracteres',
      },
    },
    animalType: {
      required: 'Espécie obrigatória',
      minLength: {
        value: 1,
        message: 'Mínimo de 1 caracteres',
      },
    },
    animalBreed: {
      required: 'Raça obrigatória',
      minLength: {
        value: 1,
        message: 'Mínimo de 1 caracteres',
      },
    },
    age: {
      required: 'Idade obrigatória',
      maxLength: {
        value: 3,
        message: 'Máximo de 3 números',
      },
    },
    images: {
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: (image: FileList) => {
          return (
            image[0].size <= 10485760 || 'O arquivo deve ser menor que 10MB'
          );
        },
        acceptedFormats: (image: FileList) => {
          return (
            image[0].type.search('^.*image/(jpg|JPG|jpeg|JPEG|png|PNG)$') !==
              -1 || 'Somente são aceitos arquivos PNG, JPEG'
          );
        },
      },
    },
  };

  const queryClient = useQueryClient()
  const mutation = useMutation(async (formData: FormData) => {
    console.log(formData)
    const response = await api.post('/donations', formData)

    return response.data
  },{
    onSuccess: () => {
      alert('Post criado com sucesso.')
      queryClient.invalidateQueries('donations')
    }
  })

  const handleNewPost: SubmitHandler<NewPostData> = async (values, event) => {
    const { title, images, description, animalType, animalBreed, age } = values
    console.log(title)

    const formData = new FormData()

    for (var index = 0; index < images.length; ++index) {
      var file = images.item(index);
      formData.append('images', file)
    }

    formData.append('title', title)
    formData.append('description', description)
    formData.append('animalType', animalType)
    formData.append('animalBreed', animalBreed)
    formData.append('age', age)

    await mutation.mutateAsync(formData)
    closeModal();
  };

  return (
      <Flex
        as="form"
        direction='column'
        p={4}
        bg='white'
        mb={2}
        borderRadius='md'
        onSubmit={handleSubmit(handleNewPost)}
      >
        <SimpleGrid columns={2} spacing={2} mb={2}>
            <Input
              placeholder='Nome'
              name='title'
              type='text'
              error={errors.title}
              {...register('title', formValidations.title)}
            />
            <Input
              placeholder='Espécie'
              name='animalType'
              type='text'
              error={errors.animalType}
              {...register('animalType', formValidations.animalType)}
            />
            <Input
              placeholder='Raça'
              name='animalBreed'
              type='text'
              error={errors.animalBreed}
              {...register('animalBreed', formValidations.animalBreed)}
            />
            <Input
              placeholder='Idade'
              name='age'
              type='number'
              error={errors.age}
              {...register('age', formValidations.age)}
            />
          </SimpleGrid>
          <Input
            placeholder='Descrição'
            name='description'
            mb={2}
            type='text'
            error={errors.description}
            {...register('description', formValidations.description)}
          />
          <Divider />

          <ImageUpload
            multiple
            control={control}
            error={errors.images}
            register={register('images', formValidations.images)}
          />

        <ActionButton type='submit' isLoading={isSubmitting}>
          Enviar
        </ActionButton>
      </Flex>
  );
};

export { NewPost };
