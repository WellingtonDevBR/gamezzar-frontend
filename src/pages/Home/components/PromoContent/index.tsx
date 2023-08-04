import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import controllerImg from "../../../../assets/controller.svg";
import rocketImg from "../../../../assets/rocket.svg";
import noteImg from "../../../../assets/note.svg";
import { Link } from "react-router-dom";

// Header Component
export function PromoContent() {
  return (
    <Flex
      w="1020px"
      direction={{ base: "column", md: "row" }}
      alignItems={{ base: "center", md: "flex-start" }}
      justify="space-between"
      p={8}
      rounded="md"
      boxShadow="md"
    >
      <Box
        flex={1}
        mr={{ base: 0, md: 8 }}
        mb={{ base: 8, md: 0 }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Heading as="h1" size="2xl" mb={2}>
          Discover, find,
          <Text as="p" display="block" color="#5142FC">
            Trade extraordinary
          </Text>
          Games
        </Heading>
        <Text mb={4}>Marketplace For Exchanging Games Globally</Text>
        <ButtonGroup spacing={25}>
          <Link to="/explorer">
            <Button
              h="50px"
              w="150px"
              bg="#5142FC"
              color="#fff"
              _hover={{ filter: "brightness(0.9)" }}
              leftIcon={<Image src={rocketImg} boxSize={7} />}
            >
              Explorer
            </Button>
          </Link>
          <Link to="/user/request/new-game">
            <Button
              h="50px"
              w="150px"
              color="#5142FC"
              _hover={{ filter: "brightness(0.8)" }}
              leftIcon={<Image src={noteImg} boxSize={6} />}
              bg="whiteAlpha.900"
            >
              Create
            </Button>
          </Link>
        </ButtonGroup>
      </Box>
      <Box flex={1}>
        <Image src={controllerImg} alt="controller" objectFit="contain" />
      </Box>
    </Flex>
  );
}
