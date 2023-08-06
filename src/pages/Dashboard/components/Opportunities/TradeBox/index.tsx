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
import Cookies from "js-cookie";

// MessageBox Component
export function TradeBox({ isOpen, onClose, proposal }) {
  const toast = useToast();
  const token = Cookies.get("token");
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const sendProposal = async () => {
    // Replace with your actual endpoint and request data
    const data = {
      bidder_id: proposal.bidder.user_id,
      receiver_id: proposal.receiver.user_id,
      bidder_game_id: proposal.bidder.game_id,
      receiver_game_id: proposal.receiver.game_id,
      status: "pending",
    };

    try {
      const response = await axios.post("/api/propose", data);
      if (response.status === 201) {
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
        <ModalContent maxW="60%" bg="blackAlpha.600">
          <ModalHeader color="white" borderBottom="">
            Send Proposal
            <Divider />
          </ModalHeader>
          <ModalBody>
            <Flex>
              <Tooltip label={proposal.bidder.game_title} placement="top">
                <Image
                  boxSize="170px"
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    proposal.bidder.game_image
                  }`}
                  alt={proposal.bidder.game_title}
                  mr={3}
                />
              </Tooltip>
              <Tooltip label={proposal.receiver.game_title} placement="top">
                <Image
                  boxSize="170px"
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    proposal.receiver.game_image
                  }`}
                  alt={proposal.receiver.game_title}
                />
              </Tooltip>
              <Text ml={4} color="white" fontSize="2xl">
                Your proposal notifies{" "}
                <Text as="span" fontWeight="bold" color="#5142FC">
                  {`${proposal.receiver.first_name
                    .toString()
                    .toUpperCase()} ${proposal.receiver.last_name
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
