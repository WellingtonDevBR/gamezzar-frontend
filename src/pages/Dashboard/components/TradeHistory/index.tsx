import {
  Box,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tooltip,
  Badge,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
  RadioGroup,
  Stack,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { InactiveTradesImageContainer } from "./styles";
import { convertTimeFormat } from "../../../../helper/convertTimeFormat";
import { getAxiosInstance } from "../../../../services/axios";
import Cookies from "js-cookie";

export function TradeHistory({ transactions, userId }: any) {
  console.log("transactions", transactions);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const toast = useToast();
  const token = Cookies.get("token");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "cancelled":
        return <Badge colorScheme="red">{status}</Badge>;
      case "pending":
        return <Badge colorScheme="orange">{status}</Badge>;
      case "success":
        return <Badge colorScheme="green">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleOpenFeedback = (transactionId, receiverId) => {
    setSelectedTransaction(transactionId);
    setReceiverId(receiverId);
    onOpen();
  };

  const handleFeedbackSubmit = async () => {
    const feedbackData = {
      transaction_id: selectedTransaction,
      comment: feedback,
      score: feedbackType,
      receiver_id: receiverId,
    };

    const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post("/api/feedback", feedbackData);

    if (response.status === 201) {
      onClose();
      toast({
        title: "Feedback.",
        description: "Your Feedback has been sent successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    setFeedback("");
    setFeedbackType("");
    setSelectedTransaction(null);
    onClose();
  };

  const uniqueTransactions = transactions.reduce((unique, current) => {
    const isDuplicate = unique.some(
      (item) => item.transaction_id === current.transaction_id
    );

    if (!isDuplicate) {
      unique.push(current);
    }

    return unique;
  }, []);

  // Then, keep only the transactions that involve the user
  // And transactions where both users haven't given feedback
  const filteredTransactions = uniqueTransactions.filter((item) => {
    return item.bidder.user_id === userId || item.receiver.user_id === userId;
  });

  return (
    <Box
      mt={5}
      p={5}
      boxShadow="lg"
      borderRadius="md"
      bg="transparent"
      color="white"
      width="800px"
    >
      <Box as="h1" mb={5} fontSize="xl" fontWeight="bold">
        Trade History
      </Box>
      {!activeTab ? (
        <Table variant="simple" colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th>Transaction ID</Th>
              <Th>Bidder Offered Item</Th>
              <Th>Bidding Item</Th>
              <Th>Status</Th>
              <Th>Last Update</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTransactions.map((trade) => (
              <Tr key={trade.transaction_id}>
                <Td>{trade.transaction_id}</Td>
                <Td>
                  <Box display="flex" alignItems="center">
                    <Tooltip
                      label={trade.bidder_game.title}
                      aria-label="A tooltip"
                    >
                      <Image
                        boxSize="80px"
                        objectFit="cover"
                        src={`${import.meta.env.VITE_S3_URL}/games/${
                          trade.bidder_game.image
                        }`}
                        alt={trade.bidder_game.title}
                        mr={3}
                      />
                    </Tooltip>
                  </Box>
                </Td>
                <Td>
                  <Box display="flex" alignItems="center">
                    <Tooltip
                      label={trade.receiver_game.title}
                      aria-label="A tooltip"
                    >
                      <Image
                        boxSize="80px"
                        objectFit="cover"
                        src={`${import.meta.env.VITE_S3_URL}/games/${
                          trade.receiver_game.image
                        }`}
                        alt={trade.receiver_game.title}
                        mr={3}
                      />
                    </Tooltip>
                  </Box>
                </Td>
                <Td>{getStatusBadge(trade.status)}</Td>
                <Td>{convertTimeFormat(trade.created_at)}</Td>
                <Td>
                  <Td>
                    {trade.feedback.feedback_giver.user_id === userId ||
                    trade.feedback.feedback_receiver.user_id ? (
                      <Badge colorScheme="green">Feedback Given</Badge>
                    ) : (
                      <Button
                        size="sm"
                        colorScheme="purple"
                        onClick={() =>
                          handleOpenFeedback(
                            trade.transaction_id,
                            userId !== trade.receiver.user_id
                              ? trade.receiver.user_id
                              : trade.bidder.user_id
                          )
                        }
                      >
                        Give Feedback
                      </Button>
                    )}
                  </Td>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <InactiveTradesImageContainer>
          <img
            src="https://cdn.trocajogo.net/static/undraw/undraw_anonymous_feedback_y3co.svg"
            alt="Project Image"
          />
          <span>No feedbacks available</span>
        </InactiveTradesImageContainer>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="blackAlpha.600">
          <ModalHeader>Give Feedback</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Feedback Type</FormLabel>
              <RadioGroup onChange={setFeedbackType} value={feedbackType}>
                <Stack direction="row">
                  <Radio value="positive">😊 Positive</Radio>
                  <Radio value="neutral">😐 Neutral</Radio>
                  <Radio value="negative">😟 Negative</Radio>
                </Stack>
              </RadioGroup>
              <FormLabel mt={3}>Feedback</FormLabel>
              <Textarea
                placeholder="Write your feedback here"
                onChange={(e) => setFeedback(e.target.value)}
                value={feedback}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleFeedbackSubmit}>
              Submit
            </Button>
            <Button colorScheme="red" variant="solid" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
