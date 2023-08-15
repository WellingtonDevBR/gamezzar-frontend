import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  Flex,
  AspectRatio,
} from "@chakra-ui/react";
import { HStack, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function PopularCollection({ userPopularCollections }) {
  if (userPopularCollections.length <= 1) return;
  return (
    <Box width="1030px" mt={50}>
      <Heading fontSize="3xl" mb="3">
        Popular Collections
      </Heading>
      <Flex direction={{ base: "column", lg: "row" }} justify="space-between">
        {userPopularCollections.map((userCollection) => {
          const { UserName, Avatar, games } = userCollection;
          return (
            <CollectionCard
              headerImg={Avatar}
              title0={games[0]?.Title}
              title1={games[1]?.Title}
              title2={games[2]?.Title}
              title3={games[3]?.Title}
              mainImg={games[0]?.Image}
              smallImg1={games[1]?.Image}
              smallImg2={games[2]?.Image}
              largeImg={games[3]?.Image}
              gameid0={games[0]?.GameId}
              gameid1={games[1]?.GameId}
              gameid2={games[2]?.GameId}
              gameid3={games[3]?.GameId}
              title={UserName}
              number={games.feedbacks}
              name={UserName}
              mr={{ base: "0", lg: "4" }} // Adding margin to the right side on larger screens
              w={{ base: "full", lg: "calc(50% - 2rem)" }} // Making the card take up half the width minus the margin on larger screens
            />
          );
        })}
      </Flex>
    </Box>
  );
}

function CollectionCard({
  title0,
  title1,
  title2,
  title3,
  headerImg,
  mainImg,
  smallImg1,
  smallImg2,
  largeImg,
  gameid0,
  gameid1,
  gameid2,
  gameid3,
  title,
  number,
  name,
  mr,
  w,
}) {
  return (
    <Box w={w} mr={mr} p="4" bg="gray.700" borderRadius="xl" boxShadow="xl">
      <VStack align="stretch" spacing="4">
        <Flex direction={{ base: "column", lg: "row" }} justify="space-between">
          <HStack align="center">
            <Image
              borderRadius="100%"
              boxSize="10"
              src={`${import.meta.env.VITE_S3_URL}/avatar/${headerImg}`}
            />
            <Heading size="md" color="white">
              {title}
            </Heading>
          </HStack>
          <Box
            w="7"
            h="6"
            borderRadius="md"
            bg="gray.800"
            d="flex"
            align="center"
            color="white"
          >
            {number ? number : 0}
          </Box>
        </Flex>
        <Flex direction={{ base: "column", lg: "row" }} justify="space-between">
          <AspectRatio ratio={4 / 3} flex={{ base: "none", lg: "1" }}>
            <Tooltip label={title0} fontSize="md">
              <Link to={`/game/${gameid0}`}>
                <Image
                  src={`${import.meta.env.VITE_S3_URL}/games/${mainImg}`}
                  alt={title0}
                  objectFit="cover"
                  borderRadius="xl"
                />
              </Link>
            </Tooltip>
          </AspectRatio>
          <Flex
            direction="column"
            justify="space-between"
            flex="1"
            ml={{ base: 0, lg: "3" }}
          >
            <AspectRatio ratio={4 / 3} mb={{ base: "4", lg: "4" }}>
              <Tooltip label={title1} fontSize="md">
                <Link to={`/game/${gameid1}`}>
                  <Image
                    src={`${import.meta.env.VITE_S3_URL}/games/${smallImg1}`}
                    alt={title1}
                    objectFit="cover"
                    borderRadius="xl"
                  />
                </Link>
              </Tooltip>
            </AspectRatio>
            <HStack
              spacing="4"
              justify="center"
              align="center"
              mt={{ base: "4", lg: "4" }}
            >
              <AspectRatio ratio={1} flex="1">
                <Tooltip label={title2} fontSize="md">
                  <Link to={`/game/${gameid2}`}>
                    <Image
                      src={`${import.meta.env.VITE_S3_URL}/games/${smallImg2}`}
                      alt={title2}
                      objectFit="cover"
                      borderRadius="xl"
                      maxH="200px" // You can adjust this based on your needs
                    />
                  </Link>
                </Tooltip>
              </AspectRatio>
              <AspectRatio ratio={1} flex="1">
                <Tooltip label={title3} fontSize="md">
                  <Link to={`/game/${gameid3}`}>
                    <Image
                      src={`${import.meta.env.VITE_S3_URL}/games/${largeImg}`}
                      alt={title3}
                      objectFit="cover"
                      borderRadius="xl"
                      maxH="200px" // You can adjust this based on your needs
                    />
                  </Link>
                </Tooltip>
              </AspectRatio>
            </HStack>
          </Flex>
        </Flex>
      </VStack>
    </Box>
  );
}
