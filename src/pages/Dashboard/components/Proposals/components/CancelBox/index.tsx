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
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { getAxiosInstance } from "../../../../../../services/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// MessageBox Component
export function CancelBox({ isOpen, onClose, proposal, isBidder }) {
  const toast = useToast();
  const token = Cookies.get("token");
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const navigate = useNavigate();

  const {
    isOpen: isSubmitting,
    onOpen: startSubmitting,
    onClose: endSubmitting,
  } = useDisclosure();

  const cancelProposal = async () => {
    startSubmitting();
    try {
      const response = await axios.delete(
        `/api/propose/${proposal.propose_id}`
      );
      if (response.status === 200) {
        await axios.post("/api/transaction", {
          bidder_id: proposal.bidder.user_id,
          receiver_id: proposal.receiver.user_id,
          bidder_game_id: proposal.bidder_game.game_id,
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
        navigate(0);
        navigate("/dashboard", { state: { tab: "Proposals" } });
        endSubmitting();
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
    endSubmitting();
  };

  return (
    <Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="60%" bg="blackAlpha.600">
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
                    isBidder
                      ? proposal.bidder_game.image
                      : proposal.receiver_game.image
                  }`}
                  alt={proposal.receiver_game.title}
                  mr={3}
                />
              </Tooltip>
              <Tooltip label={proposal.game_two_title} placement="top">
                <Image
                  boxSize="170px"
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    isBidder
                      ? proposal.receiver_game.image
                      : proposal.bidder_game.image
                  }`}
                />
              </Tooltip>
              <Text ml={4} color="white" fontSize="2xl">
                Your proposal cancelation notifies{" "}
                <Text as="span" fontWeight="bold" color="red">
                  {isBidder
                    ? `${proposal.receiver.first_name
                        .toString()
                        .toUpperCase()} ${proposal.receiver.last_name
                        .toString()
                        .toUpperCase()}`
                    : `${proposal.bidder.first_name
                        .toString()
                        .toUpperCase()} ${proposal.bidder.last_name
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
            <Button
              colorScheme="blue"
              onClick={cancelProposal}
              isLoading={isSubmitting}
              spinner={<Spinner color="#c6c6c6" />}
              disabled={isSubmitting}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
