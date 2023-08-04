import React, { useState } from "react";
import {
  Box,
  Image,
  Button,
  VStack,
  Stack,
  HStack,
  useBreakpointValue,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { ProposeModal } from "../../../../../../components/ProposalModal";

interface CardGameProps {
  title: string;
  owner: string;
  image: string;
  avatar: string;
  game: any;
  userCollections: any[];
}

export function CardGame(props: CardGameProps) {
  const [isProposeModalOpen, setIsProposeModalOpen] = useState(false);
  const imageSize = useBreakpointValue({ base: "100px", md: "200px" });
  const profileSize = useBreakpointValue({ base: "20px", md: "40px" });

  const token = Cookies.get("token");

  return (
    <Box
      bg="#343444"
      borderRadius="lg"
      overflow="hidden"
      p={3}
      w="full"
      _hover={{ transform: "scale(1.05)", transition: "all 0.3s ease" }} // Add hover effect to scale the card
    >
      <Box position="relative" cursor="pointer">
        <Tooltip label={props.title} aria-label="A tooltip">
          <Image
            h={imageSize}
            w="100%"
            objectFit="cover"
            src={`${import.meta.env.VITE_S3_URL}/games/${props.image}`} // replace with your image source
            alt={props.title}
            _hover={{ transform: "scale(1.1)", transition: "all 0.3s ease" }} // Add hover effect to scale the image
          />
        </Tooltip>
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
            <NavLink style={{ textDecoration: "none" }} to="/login">
              <Button
                minWidth={"50%"}
                colorScheme="blackAlpha.100"
                border="1px solid #5142fc"
                _hover={{ bg: "#5142fc" }}
              >
                Trade
              </Button>
            </NavLink>
          )}
          <ProposeModal
            game={props.game}
            loggedUserCollection={props.userCollections}
            isModalOpen={isProposeModalOpen}
            setModalOpen={setIsProposeModalOpen}
          />
          <NavLink
            style={{ all: "unset" }}
            to={`/game/${props.game.item.game_id}`}
          >
            <Button
              bg="#5142fc"
              color="#fff"
              _hover={{ filter: "brightness(0.9)" }}
            >
              Details
            </Button>
          </NavLink>
        </HStack>
      </VStack>
    </Box>
  );
}
