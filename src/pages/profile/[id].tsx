import { Flex, Text, Box, Stack, useToast } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Head from 'next/head';
import * as yup from 'yup';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { ActionButton } from '../../components/ActionButton';

import { ImageUpload } from '../../components/FileUpload';
import { FiCheckCircle, FiLock, FiMail } from 'react-icons/fi';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useMutation } from 'react-query';
import { api } from '../../services/apiClient';

type UpdateProfileData = {
  images: FileList;
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
};

type ProfileData = {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}

const profileFormSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
  oldPassword: yup.string(),
  newPassword: yup.string(),
});

function Profile() {

  const { user, setUser } = useContext(AuthContext)
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({ resolver: yupResolver(profileFormSchema)});

  const mutationProfile = useMutation(
    async (profileData: ProfileData) => {

      const response = await api.put('/profile', {
        email: profileData.email || user?.email,
        name: profileData.name || user?.name,
        password: profileData.newPassword || undefined,
        oldPassword: profileData.oldPassword || undefined
      })

      return response.data
  }, {
    onSuccess: (data) => {
      const { name, email } = data

      toast({
        title: 'Dados atualizados!',
        description: 'Suas informações foram atualizadas com sucesso!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      setUser({
        ...user,
        name,
        email
      })
    },
    onError: (error) => {
      toast({
        title: 'Ops!...',
        description: 'Houve um problema ao atualizar seus dados, tente novamente mais tarde.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  })

  const mutationAvatar = useMutation(
    async (avatarData: FormData) => {

      const response = await api.patch('users', avatarData)

      const { avatarURL } = response.data

      setUser({
        ...user,
        avatarURL
      })

      return response.data
  }, {
    onSuccess: (data) => {
      const { avatarURL } = data

      toast({
        title: 'Avatar atualizado!',
        description: 'Seu avatar foi atualizado com sucesso!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      setUser({
        ...user,
        avatarURL
      })
    },
    onError: (error) => {

      toast({
        title: 'Ops!...',
        description: 'Houve um problema ao tentar atualizar seu avatar, tente novamente mais tarde!',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });

    }
  })

  const handleProfileUpdate: SubmitHandler<UpdateProfileData> = async (
    values,
    event
  ) => {
    const { images, email, name, oldPassword, newPassword } = values

    const formData = new FormData()

    formData.append('avatar', images[0])

    try {
      if (images.length > 0) {
        mutationAvatar.mutateAsync(formData)
      }

      mutationProfile.mutateAsync({email, newPassword, oldPassword, name})

    } catch (error) {
      console.log(error)
    }

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
          control={control}
          error={errors.image}
          register={register('images')}
          avatar={user?.avatarURL}
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
              defaultValue={user?.name}
              name="name"
              type="text"
              error={errors.name}
              {...register('name')}
            />
            <Input
              placeholder="Email"
              name="email"
              defaultValue={user?.email}
              icon={FiMail}
              type="text"
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
