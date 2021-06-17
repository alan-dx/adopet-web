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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";

import { Header } from "../../../components/Header";
import { ActionButton } from "../../../components/ActionButton";
import { FileUpload } from "../../../components/FileUpload";

import { validateImageFile } from "../../../utils/validateImageFile";

type FormValues = {
  file_: FileList;
};

const NewPost = () => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => console.log("On Submit: ", data));

  const watchImages = watch("file_");

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
    <form onSubmit={onSubmit}>
      <Header title="Novo post" />

      <Flex direction="column" align="center" p={[4, 8]}>
        <FormControl isInvalid={!!errors.file_}>
          <FormLabel>{"Adicionar foto"}</FormLabel>

          {previewImages.length !== 0 && (
            <Stack direction="row" overflow="scroll" spacing={4}>
              {previewImages?.map((image) => (
                <AspectRatio key={image} ratio={4 / 3} flex={1} minWidth="xs">
                  <Image src={image} borderRadius={8} />
                </AspectRatio>
              ))}
            </Stack>
          )}

          <Box my={[4, 8]}>
            <FileUpload
              accept={"image/*"}
              multiple
              register={register("file_", { validate: validateImageFile })}
            >
              <Button
                bg="gray.300"
                textColor="gray.600"
                width="full"
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

        <ActionButton>Submit</ActionButton>
      </Flex>
    </form>
  );
};

export default NewPost;
