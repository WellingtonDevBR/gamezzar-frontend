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
  Badge
} from "@chakra-ui/react";
import { useState } from "react";
import { InactiveTradesImageContainer } from "./styles";
import { convertTimeFormat } from "../../../../helper/convertTimeFormat";

export function TradeHistory({ transactions }: any) {
  const [activeTab, setActiveTab] = useState(false);
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
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((trade) => (
              <Tr key={trade.transaction_id}>
                <Td>{trade.transaction_id}</Td>
                <Td>
                  <Box display="flex" alignItems="center">
                    <Tooltip
                      label={trade.sender_game.title}
                      aria-label="A tooltip"
                    >
                      <Image
                        boxSize="80px"
                        objectFit="cover"
                        src={`${import.meta.env.VITE_S3_URL}/games/${
                          trade.sender_game.image
                        }`}
                        alt={trade.sender_game.title}
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
    </Box>
  );
}
