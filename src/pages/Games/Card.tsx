import React from "react";
import { Box, Image, VStack, Text, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface CardProps {
  key: string;
  gameId: string;
  image: string;
  title: string;
}

export function Card(props: CardProps) {
  const imageSize = useBreakpointValue({ base: "100px", md: "200px" });

  return (
    <Box
      bg="#343444"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      w="full"
      width="200px"
    >
      <Box position="relative">
        <Link to={`/game/${props.gameId}`}>
          <Image
            h={imageSize}
            w="100%"
            objectFit="cover"
            src={`${import.meta.env.VITE_S3_URL}/games/${props.image}`} // replace with your image source
            alt={props.title}
          />
        </Link>
      </Box>
      <VStack align="start" mt={4}>
        <Text
          fontSize="md"
          fontWeight="semibold"
          isTruncated
          noOfLines={2}
          maxW={"100%"}
        >
          {props.title}
        </Text>
      </VStack>
    </Box>
  );
}
