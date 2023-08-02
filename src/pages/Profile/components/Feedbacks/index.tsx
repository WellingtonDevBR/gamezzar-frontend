import {
  Box,
  Stack,
  Flex,
  Text,
  Avatar,
  AspectRatio,
  Image,
  useBreakpointValue,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";

interface Feedbacks {
  feedback_receiver: {
    comment: string;
    created_at: string;
    transaction: {
      receiver_game: {
        image: string;
        title: string;
      };
      bidder_game: {
        image: string;
        title: string;
      };
      receiver: {
        first_name: string;
        last_name: string;
        address: {
          address?: string;
        };
      };
    };
  };
}

interface FeedbackProps {
  feedbacks: Feedbacks[];
}

export function Feedback({ feedbacks }: FeedbackProps) {
  const boxSize = useBreakpointValue({
    base: "300px",
    md: "500px",
    lg: "1000px",
  });

  if (!feedbacks) {
    return <div>Loading...</div>;
  }

  return (
    <Box w={boxSize} mx="auto" pb="20px">
      {feedbacks?.map((feedback) => {
        return (
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing="30px"
            mt="20px"
          >
            <AspectRatio ratio={2 / 3} w="100px">
              <Tooltip
                label={
                  feedback.feedback_receiver.transaction.receiver_game.title
                }
                placement="top"
              >
                <Image
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    feedback.feedback_receiver?.transaction.receiver_game?.image
                  }`}
                  alt={
                    feedback.feedback_receiver.transaction.receiver_game.title
                  }
                  borderRadius="5px"
                  objectFit="cover"
                  title={
                    feedback.feedback_receiver.transaction.receiver_game.title
                  }
                />
              </Tooltip>
            </AspectRatio>
            <AspectRatio ratio={2 / 3} w="100px">
              <Tooltip
                label={feedback.feedback_receiver.transaction.bidder_game.title}
                placement="top"
              >
                <Image
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    feedback.feedback_receiver?.transaction.bidder_game?.image
                  }`}
                  alt={feedback.feedback_receiver.transaction.bidder_game.title}
                  borderRadius="5px"
                  objectFit="cover"
                  title={
                    feedback.feedback_receiver.transaction.bidder_game.title
                  }
                />
              </Tooltip>
            </AspectRatio>
            <Box flex="1" mt={{ base: "20px", md: "0px" }}>
              <Box bg="#3a31c8" borderRadius="5px" p="10px" mb="10px">
                <Text noOfLines={5} fontSize="16px" mb="10px">
                  {feedback.feedback_receiver.comment
                    ? feedback.feedback_receiver.comment
                    : "You have received no comments for this feedback."}
                </Text>
                <Text textAlign="right" fontSize="12px" fontWeight="bold">
                  {feedback.feedback_receiver.created_at}
                </Text>
              </Box>
              <Flex mt="20px">
                <Avatar
                  size="md"
                  src="https://gamezzar-images.s3.us-east-2.amazonaws.com/avatar/avatar1.svg"
                  alt="User"
                />
                <Stack ml="10px">
                  <Text fontSize="16px">
                    {feedback.feedback_receiver.transaction.receiver.first_name}{" "}
                    {feedback.feedback_receiver.transaction.receiver.last_name}
                  </Text>
                  <Text fontSize="12px" color="gray.400">
                    {feedback.feedback_receiver.transaction.receiver.address
                      .address
                      ? feedback.feedback_receiver.transaction.receiver.address
                          .address
                      : "No address available"}
                  </Text>
                </Stack>
              </Flex>
            </Box>
          </Stack>
        );
      })}
    </Box>
  );
}
