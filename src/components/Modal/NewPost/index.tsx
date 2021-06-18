import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { NewPost } from '../../Form/NewPost';

interface ModalNewPostProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalNewPost = ({ isOpen, onClose }: ModalNewPostProps) => {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent bgColor='purple.500'>
        <ModalHeader color='gray.50' fontSize='xl'>
          Novo post
        </ModalHeader>

        <ModalCloseButton color='gray.50' />

        <ModalBody>
          <NewPost closeModal={handleCloseModal} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ModalNewPost };
