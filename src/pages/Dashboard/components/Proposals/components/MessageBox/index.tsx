import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
  Text,
  Flex,
  Center,
  useToast,
  useDisclosure,
  Textarea,
  Spinner,
  ModalFooter,
  Stack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getAxiosInstance } from "../../../../../../services/axios";
import { VStack } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";

interface IProposal {
  receiver: {
    user_id: string;
    first_name: string;
    last_name: string;
    avatar: string;
    game_id: string;
  };
  bidder: {
    user_id: string;
    first_name: string;
    last_name: string;
    avatar: string;
    game_id: string;
  };
  bidder_game: {
    game_id: string;
  };
  receiver_game: {
    game_id: string;
  };
}

interface MessageBoxProps {
  onClose: () => void;
  proposal: IProposal;
  isSender: boolean;
  isOpen?: boolean;
}

export function MessageBox({
  isOpen,
  onClose,
  proposal,
  isSender,
}: MessageBoxProps) {
  const toast = useToast();
  const token = Cookies.get("token");
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  if (!token) {
    navigate("/login");
  }

  const {
    isOpen: isSubmitting,
    onOpen: startSubmitting,
    onClose: endSubmitting,
  } = useDisclosure();

  const handleSendMessage = async () => {
    startSubmitting();

    try {
      await axios.post("/api/message/", {
        ...proposal,
        message,
        is_sender: isSender,
      });
      await axios.post("/api/propose", {
        bidder_id: proposal.bidder.user_id,
        receiver_id: proposal.receiver.user_id,
        bidder_game_id: proposal.bidder_game.game_id,
        receiver_game_id: proposal.receiver_game.game_id,
        status: "talking",
      });

      toast({
        title: "Message sent.",
        description: "Your message has been sent successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      endSubmitting();
      onClose();
    } catch (error) {
      console.log(error);
      endSubmitting();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={{ base: "90%", md: "50%" }}
          minH="40%"
          bg="blackAlpha.600"
        >
          <ModalHeader color="white">New Message</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <Image
                  boxSize="70px"
                  src={`${import.meta.env.VITE_S3_URL}/avatar/${
                    proposal.receiver.avatar
                  }`}
                  alt={proposal.receiver.first_name}
                  mr={3}
                />
                <Flex direction="column" ml={4}>
                  <Text color="white" fontSize="2xl">
                    To:{" "}
                    <Text as="span" fontWeight="bold" color="red">
                      {isSender
                        ? `${proposal.bidder.first_name} ${proposal.bidder.last_name}`
                        : `${proposal.receiver.first_name} ${proposal.receiver.last_name}`}
                    </Text>
                  </Text>
                  <Textarea
                    placeholder="Type your message here..."
                    onChange={handleInputChange}
                    value={message}
                    fontSize="xl"
                    mt={4}
                    bg="whiteAlpha.800"
                    color="blackAlpha.800"
                    _placeholder={{ color: "blackAlpha.600" }}
                    minW={{ base: "100%", md: "500px" }}
                    minH="200px"
                  />
                  <HStack justifyContent="flex-end" spacing={4} mt={5}>
                    <Button colorScheme="red" onClick={onClose}>
                      Close
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={handleSendMessage}
                      isLoading={isSubmitting}
                      spinner={<Spinner color="#c6c6c6" />}
                      disabled={isSubmitting}
                    >
                      Send
                    </Button>
                  </HStack>
                </Flex>
              </Stack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
}
