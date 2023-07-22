import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
} from '@chakra-ui/react';
import {
  MdFileCopy,
  MdFileUpload,
  MdHome,
  MdLock,
  MdLayers,
  MdAutoAwesome,
  MdOutlineManageAccounts,
} from 'react-icons/md';

const UploadButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Do something with the file, e.g., upload it to the server
      console.log('Selected file:', file.name);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="primary"
          py="20px"
          px="50px" /* Đổi giá trị px để nút dài ra */
          fontSize="sm"
          borderRadius="5px"
          _hover={{
            boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
            bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
            _disabled: {
              bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
            },
          }}
          onClick={handleUploadClick}
        >
          <Icon as={MdFileUpload} width="20px" height="20px" color="inherit" />
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input type="file" accept=".pdf,.txt" onChange={handleFileChange} />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="green">Upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadButton;
