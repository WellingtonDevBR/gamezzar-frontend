import { Card } from "./Card";
import { useEffect, useState } from "react";
import { getAxiosInstance } from "../../services/axios";
import {
  Box,
  VStack,
  Container,
  SimpleGrid,
  Spinner,
  useBreakpointValue,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

interface games {
  game_id: string;
  title: string;
  image: string;
}

export function Games() {
  const [games, setGames] = useState<games[]>([]);
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 4, lg: 5 });
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(0);
  const [endOfList, setEndOfList] = useState(false);
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);

  useEffect(() => {
    document.title = "Games | Gamezzar";
    fetchMoreData(); // Fetch data immediately after component mounts
  }, []);

  async function fetchMoreData() {
    if (endOfList) return;
    setIsFetching(true);
    try {
      const response = await axios.get(`/api/game/get-all?offset=${offset}`);
      if (response.data.length <= 0) {
        setEndOfList(true);
        return;
      }

      setGames((prevGames) => {
        const newGames = response.data.filter(
          (newGame) =>
            !prevGames.some((game) => game.game_id === newGame.game_id)
        );
        return [...prevGames, ...newGames];
      });

      setOffset((prevOffset) => prevOffset + 10); // Move the increment line here
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    function handleScroll() {
      // Check if the page is at the bottom or near the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 10
      ) {
        if (!isFetching && !endOfList) {
          fetchMoreData();
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, endOfList]); // Added endOfList as a dependency

  return (
    <Container maxW="6xl" mb={250}>
      <VStack spacing={4}>
        <Flex
          justifyContent="center"
          alignItems="center"
          bg="gray"
          w="100%"
          h="150px"
          mb={10}
        >
          <VStack>
            <Heading as="h1" size="lg">
              Games
            </Heading>
            <Text>Home / Games</Text>
          </VStack>
        </Flex>

        <SimpleGrid columns={columns} spacing={4} w="full">
          {games.map((game) => {
            return (
              <Card
                key={game.game_id}
                gameId={game.game_id}
                title={game.title}
                image={game.image}
              />
            );
          })}
        </SimpleGrid>
        {isFetching && (
          <Box display="flex" justifyContent="center" py="5">
            <Spinner size="xl" color="blue.500" />
          </Box>
        )}
      </VStack>
    </Container>
  );
}
