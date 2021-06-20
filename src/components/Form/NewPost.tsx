import { Flex, SimpleGrid, Divider } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../services/apiClient';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  age: string;
};

const newPostData = Yup.object().shape({
  nome: Yup.string().required('Nome obrigatório'),
  description: Yup.string().required('Descrição obrigatória'),
  animalType: Yup.string().required('Espécie obrigatória'),
  animalBreed: Yup.string().required('Raça obrigatória'),
  age: Yup.number().required('Idade obrigatória'),
  image: Yup.object().required('Imagem obrigatória'),
});

const NewPost = ({ closeModal }: NewPostProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({ resolver: yupResolver(newPostData) });

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (formData: FormData) => {
      const response = await api.post('/donations', formData);

      return response.data;
    },
    {
      onSuccess: () => {
        alert('Post criado com sucesso.');
        closeModal();
        queryClient.invalidateQueries('donations');
      },
    }
  );

  const handleNewPost: SubmitHandler<NewPostData> = async (values, event) => {
    const { title, images, description, animalType, animalBreed, age } = values;

    const formData = new FormData();

    for (var index = 0; index < images.length; ++index) {
      formData.append('images', images.item(index));
    }

    formData.append('title', title);
    formData.append('description', description);
    formData.append('animalType', animalType);
    formData.append('animalBreed', animalBreed);
    formData.append('age', age);

    await mutation.mutateAsync(formData);
  };

  return (
    <Flex
      as="form"
      direction="column"
      p={4}
      bg="white"
      mb={2}
      borderRadius="md"
      onSubmit={handleSubmit(handleNewPost)}
    >
      <SimpleGrid columns={2} spacing={2} mb={2}>
        <Input
          placeholder="Nome"
          name="title"
          type="text"
          error={errors.title}
          {...register('title')}
        />
        <Input
          placeholder="Espécie"
          name="animalType"
          type="text"
          error={errors.animalType}
          {...register('animalType')}
        />
        <Input
          placeholder="Raça"
          name="animalBreed"
          type="text"
          error={errors.animalBreed}
          {...register('animalBreed')}
        />
        <Input
          placeholder="Idade"
          name="age"
          type="number"
          error={errors.age}
          {...register('age')}
        />
      </SimpleGrid>
      <Input
        placeholder="Descrição"
        name="description"
        mb={2}
        type="text"
        error={errors.description}
        {...register('description')}
      />
      <Divider />

      <ImageUpload
        multiple
        control={control}
        error={errors.images}
        register={register('images')}
      />

      <ActionButton type="submit" isLoading={isSubmitting}>
        Enviar
      </ActionButton>
    </Flex>
  );
};

export { NewPost };
