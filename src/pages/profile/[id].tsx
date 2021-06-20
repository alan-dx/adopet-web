import { Flex, Text, Box, Stack } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Head from 'next/head';
import * as yup from 'yup';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { ActionButton } from '../../components/ActionButton';

import { ImageUpload } from '../../components/FileUpload';
import { FiCheckCircle, FiLock, FiMail } from 'react-icons/fi';
import { yupResolver } from '@hookform/resolvers/yup';

type UpdateProfileData = {
  image: FileList;
  nome: string;
  email: string;
  oldPassword: string;
  newPassword: string;
};

const profileFormSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email('E-mail inválido'),
  oldPassword: yup
    .string()
    .required('Digite sua senha')
    .min(6, 'Ao mínimo 6 caracteres'),
  newPassword: yup.string(),
});

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({ resolver: yupResolver(profileFormSchema) });

  const handleProfileUpdate: SubmitHandler<UpdateProfileData> = async (
    values,
    event
  ) => {
    console.log(values);
  };

  return (
    <>
      <Head>
        <title>Profile | AdoPet</title>
      </Head>

      <Header title="Profile" />

      <Flex
        as="form"
        w="full"
        maxW={975}
        direction="column"
        align="center"
        px={[4, 8]}
        py={[8, 4]}
        mt={[32, 16]}
        mx="auto"
        onSubmit={handleSubmit(handleProfileUpdate)}
      >
        <ImageUpload
          multiple
          control={control}
          error={errors.image}
          register={register('image')}
          avatar="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
        />

        <Flex
          direction="column"
          align="center"
          p={[4, 8]}
          bg="white"
          mb={[4, 8]}
          borderRadius="md"
          w="full"
        >
          <Stack width="full" mb={4}>
            <Input
              placeholder="Nome"
              name="nome"
              type="text"
              error={errors.nome}
              {...register('nome')}
            />
            <Input
              placeholder="Email"
              name="email"
              icon={FiMail}
              type="email"
              error={errors.email}
              {...register('email')}
            />
            <Input
              placeholder="Senha antiga"
              name="oldPassword"
              icon={FiLock}
              type="password"
              error={errors.oldPassword}
              {...register('oldPassword')}
            />
            <Input
              placeholder="Nova senha"
              name="newPassword"
              icon={FiCheckCircle}
              type="password"
              error={errors.newPassword}
              {...register('newPassword')}
            />
          </Stack>

          <Box maxW={400} w="full">
            <ActionButton type="submit" isLoading={isSubmitting}>
              Salvar
            </ActionButton>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default Profile;
