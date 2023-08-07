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
    useToast
} from '@chakra-ui/react';
import { MdFileUpload } from 'react-icons/md';

const UploadButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const toast = useToast(); // Khởi tạo useToast

    const handleUploadClick = () => {
        setIsModalOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
        }
    };

    const handleUploadFile = async () => {
        setIsModalOpen(false);

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                // const response = await fetch(`${process.env.API_URL}/upload-file`, {
                const response = await fetch(`http://127.0.0.1:9797/upload-file`, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json(); // Parse dữ liệu trả về thành JSON
                    toast({
                        title: 'File uploaded successfully.',
                        description: `File path: ${data.file_path}`, // Hiển thị đường dẫn file đã upload từ server
                        status: 'success',
                        duration: 5000,
                        isClosable: true
                    });
                } else {
                    toast({
                        title: 'Error uploading file. Please try again.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true
                    });
                }
            } catch (error) {
                toast({
                    title: 'An error occurred. Please try again later.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
            }
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
                            bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'
                        }
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
                        <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button colorScheme="green" onClick={handleUploadFile}>
                            Upload
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UploadButton;
