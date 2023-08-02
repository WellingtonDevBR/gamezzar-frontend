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
import { getAxiosInstance } from "../../../../../../services/axios";
import Cookies from 'js-cookie';

// MessageBox Component
export function CancelBox({ isOpen, onClose, proposal }) {
  const toast = useToast();
  const token = Cookies.get('token');

  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const cancelProposal = async () => {
    // Replace with your actual endpoint and request data
    try {
      const response = await axios.delete(
        `/api/propose/${proposal.propose_id}`
      );
      console.log(response)
      if (response.status === 200) {
        await axios.post("/api/transaction", {
          sender_id: proposal.sender.user_id,
          receiver_id: proposal.receiver.user_id,
          sender_game_id: proposal.sender_game.game_id,
          receiver_game_id: proposal.receiver_game.game_id,
          status: "cancelled",
        });
        toast({
          title: "Proposal Cancelled.",
          description: "Your proposal has been cancelled successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to cancel your proposal.",
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
            Cancel Proposal
            <Divider />
          </ModalHeader>
          <ModalBody>
            <Flex>
              <Tooltip label={proposal.receiver_game.title} placement="top">
                <Image
                  boxSize="170px"
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    proposal.receiver_game.image
                  }`}
                  alt={proposal.receiver_game.title}
                  mr={3}
                />
              </Tooltip>
              <Tooltip label={proposal.game_two_title} placement="top">
                <Image
                  boxSize="170px"
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    proposal.sender_game.image
                  }`}
                  alt={proposal.sender_game.title}
                />
              </Tooltip>
              <Text ml={4} color="white" fontSize="2xl">
                Your proposal cancelation notifies{" "}
                <Text as="span" fontWeight="bold" color="red">
                  {`${proposal.sender.first_name
                    .toString()
                    .toUpperCase()} ${proposal.sender.last_name
                    .toString()
                    .toUpperCase()}`}
                </Text>{" "}
                Are you sure you want to cancel this proposal?
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={cancelProposal}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
