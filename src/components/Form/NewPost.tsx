import { Flex, Stack, Divider } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiPhone } from 'react-icons/fi';

import { ActionButton } from '../ActionButton';
import { ImageUpload } from '../FileUpload';
import { Input } from '../Input';

interface NewPostProps {
  closeModal: () => void;
}

type NewPostData = {
  image: FileList;
  nome: string;
  description: string;
  phone: string;
};

const NewPost = ({ closeModal }: NewPostProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const formValidations = {
    nome: {
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
        value: 65,
        message: 'Máximo de 65 caracteres',
      },
    },
    phone: {
      required: 'Telefone obrigatório',
      minLength: {
        value: 11,
        message: 'Mínimo de 1 caracteres',
      },
    },
    image: {
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

  const handleSignIn: SubmitHandler<NewPostData> = async (values, event) => {
    console.log(values);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Flex
        direction='column'
        align='center'
        p={[4, 8]}
        bg='white'
        mb={[4, 8]}
        borderRadius='md'
      >
        <Stack width='full' mb={[4, 8]}>
          <Input
            placeholder='Nome'
            name='nome'
            type='text'
            error={errors.nome}
            {...register('nome', formValidations.nome)}
          />
          <Input
            placeholder='Descrição'
            name='description'
            type='text'
            error={errors.description}
            {...register('description', formValidations.description)}
          />
          <Input
            placeholder='Número de telefone'
            name='phone'
            type='number'
            icon={FiPhone}
            error={errors.phone}
            {...register('phone', formValidations.phone)}
          />

          <Divider />

          <ImageUpload
            multiple
            control={control}
            error={errors.image}
            register={register('image', formValidations.image)}
          />
        </Stack>

        <ActionButton type='submit' isLoading={isSubmitting}>
          Enviar
        </ActionButton>
      </Flex>
    </form>
  );
};

export { NewPost };
