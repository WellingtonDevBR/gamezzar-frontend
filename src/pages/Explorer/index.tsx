import { Card } from "./Card";
import { useEffect, useState } from "react";
import { getAxiosInstance } from "../../services/axios";
import Cookies from "js-cookie";

import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  VStack,
  Text,
  SimpleGrid,
  useBreakpointValue,
  Container,
  Spinner,
} from "@chakra-ui/react";

export function Explorer() {
  const [collections, setCollections] = useState<any[]>([]);
  const [userCollections, setUserCollections] = useState<any[]>([]);
  const selectSize = useBreakpointValue({ base: "100%", md: "200px" });
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 4, lg: 5 });
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(0);
  const token = Cookies.get("token");
  const [endOfList, setEndOfList] = useState(false);
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  axios.defaults.headers.Authorization = `Bearer ${token}`;

  useEffect(() => {
    document.title = "Explorer | Gamezzar";
    fetchMoreData(); // Pass offset to fetchMoreData function
  }, []);

  useEffect(() => {
    async function fetchLoggedInUserCollection() {
      if (token) {
        const usersCollectionResponse = await axios.get(
          "/api/user-collection/all"
        );
        setUserCollections(usersCollectionResponse.data);
      }
    }
    fetchLoggedInUserCollection();
  }, []);

  async function fetchMoreData() {
    if (endOfList) return;
    setIsFetching(true);
    try {
      const response = await axios.get(
        `/api/user-collection/?offset=${offset}`
      );
      if (response.data.length <= 0) {
        setEndOfList(true);
        return;
      }
      setCollections((prevCollections) => {
        const newItems = response.data.filter(
          (newItem) =>
            !prevCollections.some(
              (prevItem) =>
                prevItem.game_id === newItem.game_id &&
                prevItem.user_id === newItem.user_id
            )
        );
        return [...prevCollections, ...newItems];
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setOffset((prevOffset) => prevOffset + 10); // Increase offset by 10
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
        if (!isFetching) {
          fetchMoreData();
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  return (
    <Container maxW="6xl" mb={250}>
      <VStack spacing={4}>
        <Flex
          justifyContent="center"
          alignItems="center"
          bg="gray"
          w="100%"
          h="150px"
        >
          <VStack>
            <Heading as="h1" size="lg">
              Explorer
            </Heading>
            <Text>Home / Explorer</Text>
          </VStack>
        </Flex>

        <Flex justifyContent="space-between" w="full">
          <Select w={selectSize}>
            <option value="all games">All Games</option>
            <option value="all games">PS4</option>
          </Select>
          <Select w={selectSize}>
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </Select>
        </Flex>

        <SimpleGrid columns={columns} spacing={4} w="full">
          {collections.map((collection) => {
            return (
              <Card
                key={collection.item.game_id}
                title={collection.item.title}
                owner={collection.user.user_name}
                image={collection.item.image}
                avatar={collection.user.avatar}
                userCollections={userCollections}
                game={collection}
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
