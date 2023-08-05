import { Container, CardList, ShowMoreButton } from "./styles";
import { Button } from "../../../../components/Button";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { NavLink } from "react-router-dom";
import { getAxiosInstance } from "../../../../services/axios";
import { ProposeModal } from "../../../../components/ProposalModal";
import { CardGame } from "./components/CardGame";
import { SimpleGrid, Heading, Text } from "@chakra-ui/react";
import { Card } from "../../../Explorer/Card";

interface TodaysDetalsProps {
  usersCollection: any[];
}

export function TodaysDeals({ usersCollection }: TodaysDetalsProps) {
  // All states
  const token = Cookie.get("token");
  const [visibleRows, setVisibleRows] = useState(2);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userGame, setUserGame] = useState(null);
  const [loggedUserCollection, setLoggedUserCollection] = useState(null);
  // Fetching data function
  useEffect(() => {
    async function fetchCollection() {
      const axios = getAxiosInstance(`${import.meta.env.VITE_BASE_URL}`);
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const response = await axios.get("/api/user-collection/all");
      setLoggedUserCollection(response.data);
    }
    fetchCollection();
  }, []);

  const visibleCards = usersCollection.slice(0, visibleRows * 5);

  // Handler functions
  const handleUserGameClick = (index: any) => {
    setModalOpen(true);
    setUserGame(
      usersCollection.filter(
        (userCollection) => userCollection.user.user_id !== null
      )[index]
    );
  };

  // Main render return
  return (
    <>
      <Container>
        <Heading as="h1" mb={5}>
          <Text fontSize="3xl">Today's Picks</Text>
        </Heading>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 4, lg: 4, xl: 5 }}
          spacing="20px"
        >
          {visibleCards.map((card: any, index: any) => (
            <Card
              key={card.item.game_id}
              image={card.item.image}
              title={card.item.title}
              owner={card.user.user_name}
              avatar={card.user.avatar}
              userCollections={usersCollection}
              game={card}
            />
          ))}
        </SimpleGrid>
        {visibleRows * 5 < usersCollection.length && (
          <ShowMoreButton onClick={() => setVisibleRows(visibleRows + 1)}>
            Show more
          </ShowMoreButton>
        )}
        {isModalOpen && (
          <ProposeModal
            setModalOpen={setModalOpen}
            isModalOpen={isModalOpen}
            game={userGame}
            loggedUserCollection={loggedUserCollection}
          />
        )}
      </Container>
    </>
  );
}
