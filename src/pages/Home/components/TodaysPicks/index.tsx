import {
  Container,
  CardList,
  ShowMoreButton,
} from "./styles";
import { Button } from "../../../../components/Button";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { NavLink } from "react-router-dom";
import { getAxiosInstance } from "../../../../services/axios";
import { ProposeModal } from "../../../../components/ProposalModal";
import { CardGame } from "./components/CardGame";

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

  // Data preprocessing
  const listOfGames = usersCollection
    .filter((userCollection) => userCollection.user.user_id !== null)
    .map((userCollection) => ({
      src: `${import.meta.env.VITE_S3_URL}/games/${userCollection.image}`,
      alt: `${userCollection.slug}`,
      title: `${userCollection.title}`,
      owner: `${userCollection.user.user_name}`,
      avatar: `${import.meta.env.VITE_S3_URL}/avatar/${
        userCollection.user.avatar
      }`,
    }));
  const visibleCards = listOfGames.slice(0, visibleRows * 4);

  // Handler functions
  const handleUserGameClick = (index: any) => {
    setModalOpen(true);
    setUserGame(usersCollection.filter((userCollection) => userCollection.user.user_id !== null)[index]);
  };

  // Main render return
  return (
    <Container>
      <h1>Today's Picks</h1>
      <CardList>
        {visibleCards.map((card: any, index: any) => (
          <CardGame
            key={index}
            src={card.src}
            alt={card.alt}
            title={card.title}
            owner={card.owner}
            avatar={card.avatar}
            token={token}
            onTradeClick={() => handleUserGameClick(index)}
          />
        ))}
      </CardList>
      {visibleRows * 4 < listOfGames.length && (
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
  );
}
