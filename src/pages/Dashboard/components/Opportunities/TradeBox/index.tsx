import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Image,
  Text,
  Flex,
  Center,
  useToast,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import { getAxiosInstance } from "../../../../../services/axios";

// MessageBox Component
export function TradeBox({ isOpen, onClose, proposal }) {
  const toast = useToast();

  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);

  const sendProposal = async () => {
    // Replace with your actual endpoint and request data
    const url = "/your-api-endpoint";
    const data = {
      // Your proposal data
    };
    try {
      const response = await axios.post(url, data);
      if (response.status === 200) {
        toast({
          title: "Proposal sent.",
          description: "Your proposal has been sent successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to send your proposal.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  
  return (
    <Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="50%" bg="blackAlpha.600">
          <ModalHeader color="white" borderBottom="">
            Send Proposal
            <Divider />
          </ModalHeader>
          <ModalBody>
            <Flex>
              <Tooltip label={proposal.game_one_title} placement="top">
                <Image
                  boxSize="170px"
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    proposal.game_one_image
                  }`}
                  alt={proposal.game_one_title}
                  mr={3}
                />
              </Tooltip>
              <Tooltip label={proposal.game_two_title} placement="top">
                <Image
                  boxSize="170px"
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    proposal.game_two_image
                  }`}
                  alt={proposal.game_two_title}
                />
              </Tooltip>
              <Text ml={4} color="white" fontSize="2xl">
                Your proposal notifies{" "}
                <Text as="span" fontWeight="bold" color="#5142FC">
                  {`${proposal.user_two_first_name
                    .toString()
                    .toUpperCase()} ${proposal.user_two_last_name
                    .toString()
                    .toUpperCase()}`}
                </Text>{" "}
                of your interest in the trade. You can cancel until accepted.
                Once accepted, you must comply with our terms or face
                suspension/ban from Gamezzar.
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={sendProposal}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
