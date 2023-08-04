import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Button,
  VStack,
  Stack,
  HStack,
  Badge,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { AuthenticationModal } from "../../components/AuthenticationModal";
import { getAxiosInstance } from "../../services/axios";
import Cookies from "js-cookie";
import { ProposeModal } from "../../components/ProposalModal";

interface CardProps {
  key: string;
  title: string;
  owner: string;
  image: string;
  avatar: string;
  userCollections: any[];
  game: any;
}

export function Card(props: CardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProposeModalOpen, setIsProposeModalOpen] = useState(false);
  const imageSize = useBreakpointValue({ base: "100px", md: "200px" });
  const profileSize = useBreakpointValue({ base: "20px", md: "40px" });

  const token = Cookies.get("token");

  return (
    <Box bg="#343444" borderRadius="lg" overflow="hidden" p={4} w="full" width="200px">
      <Box position="relative">
        <Image
          h={imageSize}
          w="100%"
          objectFit="cover"
          src={`${import.meta.env.VITE_S3_URL}/games/${props.image}`} // replace with your image source
          alt={props.title}
        />
        {/* {props.isComingSoon && (
          <Badge position="absolute" top="0" left="0" colorScheme="teal">
            Coming Soon
          </Badge>
        )} */}
        {/* <Badge position="absolute" top="0" right="0" colorScheme="pink">
          &hearts; {props.like}
        </Badge> */}
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
        <Stack direction="row" align="center">
          <Image
            borderRadius="full"
            boxSize={profileSize}
            src={`${import.meta.env.VITE_S3_URL}/avatar/${props.avatar}`} // replace with your profile image source
            alt={props.owner}
          />
          <Box>
            <Text fontSize="sm" color="gray.500">
              Owned By
            </Text>
            <Text fontWeight="bold">{props.owner}</Text>
          </Box>
        </Stack>
        <HStack mt={4} spacing={2}>
          {token ? (
            <Button
              minWidth={"50%"}
              colorScheme="blackAlpha.100"
              border="1px solid #5142fc"
              _hover={{ bg: "#5142fc" }}
              onClick={() => setIsProposeModalOpen(true)}
            >
              Trade
            </Button>
          ) : (
            <Button
              minWidth={"50%"}
              colorScheme="blackAlpha.100"
              border="1px solid #5142fc"
              _hover={{ bg: "#5142fc" }}
              onClick={() => setIsOpen(true)}
            >
              Trade
            </Button>
          )}
          <AuthenticationModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
          <ProposeModal
            game={props.game}
            loggedUserCollection={props.userCollections}
            isModalOpen={isProposeModalOpen}
            setModalOpen={setIsProposeModalOpen}
          />
          <Button
            bg="#5142fc"
            color="#fff"
            _hover={{ filter: "brightness(0.9)" }}
          >
            Details
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
