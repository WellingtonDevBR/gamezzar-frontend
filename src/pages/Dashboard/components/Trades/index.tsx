import { Container, InactiveTradesImageContainer } from "./styles";
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
  useToast,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { convertTimeFormat } from "../../../../helper/convertTimeFormat";
import { getAxiosInstance } from "../../../../services/axios";
import Cookies from "js-cookie";
import React from "react";

export function Trades({ proposals }: any) {
  console.log(proposals);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const toast = useToast();
  const token = Cookies.get("token");
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const {
    isOpen: isOpenDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();

  const [actionType, setActionType] = useState("");
  const [currentTrade, setCurrentTrade] = useState(null);

  const cancelRef = React.useRef(); // This is needed for focus management in the dialog

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "cancelled":
        return <Badge colorScheme="red">{status}</Badge>;
      case "pending":
        return <Badge colorScheme="orange">{status}</Badge>;
      case "success":
        return <Badge colorScheme="green">{status}</Badge>;
      case "talking":
        return <Badge colorScheme="blue">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleOpenDialog = (type, trade) => {
    setActionType(type);
    setCurrentTrade(trade);
    onOpenDialog();
  };

  const handleConfirmAction = async () => {
    if (actionType === "complete") {
      // Implement your "Mark as Completed" logic here
    } else if (actionType === "cancel") {
      const response = await axios.delete(
        `/api/propose/${currentTrade.propose_id}`
      );
      if (response.status === 200) {
        console.log("test");
        const response = await axios.post(`/api/transaction/`, {
          bidder_id: currentTrade.bidder.user_id,
          receiver_id: currentTrade.receiver.user_id,
          bidder_game_id: currentTrade.bidder_game.game_id,
          receiver_game_id: currentTrade.receiver_game.game_id,
          status: "cancelled",
        });
        if (response.status === 200) {
          toast({
            title: "Trade Cancelled.",
            description: "Your trade has been cancelled successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }
    // Clear the action type and current trade
    setActionType("");
    setCurrentTrade(null);
    // Close the dialog
    onCloseDialog();
  };

  return (
    <Box>
      <Box as="h1" mb={5} fontSize="xl" fontWeight="bold">
        Ongoing Trades
      </Box>
      {!activeTab ? (
        <Table variant="simple" colorScheme="whiteAlpha" mW="5000px">
          <Thead>
            <Tr>
              <Th>Proposal ID</Th>
              <Th>Bidder Offered Item</Th>
              <Th>Bidding Item</Th>
              <Th>Status</Th>
              <Th>Bid Time</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {proposals
              .filter(
                (trade) =>
                  trade.status !== "success" && trade.status !== "cancelled"
              )
              .map((trade) => (
                <Tr key={trade.propose_id}>
                  <Td>{trade.propose_id}</Td>
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
                    <VStack spacing={3}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleOpenDialog("complete", trade)}
                        w="140px"
                        h="35px"
                      >
                        Mark as Completed
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleOpenDialog("cancel", trade)}
                        w="110px"
                        h="35px"
                      >
                        Cancel Trade
                      </Button>
                    </VStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      ) : (
        <InactiveTradesImageContainer>
          <img
            src="https://cdn.trocajogo.net/static/undraw/undraw_Group_chat_unwm.svg"
            alt="Project Image"
          />
          <h4>No sent proposals</h4>
          <p>All the proposals you send will appear here...</p>
        </InactiveTradesImageContainer>
      )}

      <AlertDialog
        isOpen={isOpenDialog}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="blackAlpha.600">
            <AlertDialogHeader color="white" fontSize="xl" fontWeight="bold">
              Confirm Action
              <Divider />
            </AlertDialogHeader>

            <AlertDialogBody color="white" fontSize="lg">
              Are you sure you want to {actionType} the trade with ID{" "}
              <Text as="b">{currentTrade?.propose_id}?</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDialog}>
                No
              </Button>
              <Button colorScheme="red" onClick={handleConfirmAction} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
