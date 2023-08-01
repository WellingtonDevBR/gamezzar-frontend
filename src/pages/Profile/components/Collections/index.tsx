import { useEffect, useState } from "react";
import { Container } from "./styles";
import { GameCard } from "./components/GameCard/GameCard";
import Cookies from "js-cookie";
import { getAxiosInstance } from "../../../../services/axios";
import { LoginRequiredModal } from "./components/LoginRequiredModal";
import { useNavigate } from "react-router-dom";
import { ProposeModal } from "../../../../components/ProposalModal";

export function Collections({ games }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userCollection, setUserCollection] = useState(null);
  const [gameCollection, setGameCollection] = useState(null);
  const [isLoginRequiredModalOpen, setLoginRequiredModalOpen] = useState(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const axios = getAxiosInstance(`${import.meta.env.VITE_BASE_URL}`);
  axios.defaults.headers.Authorization = `Bearer ${token}`;

  useEffect(() => {
    async function fetchCollection() {
      if (token) {
        const response = await axios.get("/api/user-collection/all");
        setUserCollection(response.data);
      }
    }
    fetchCollection();
  }, []);

  useEffect(() => {
    if (selectedGame !== null) {
      async function fetchSelectedGame() {
        const response = await axios.get(
          `/api/user-collection/collection/${selectedGame.game_id}`
        );
        setGameCollection(response.data);
      }
      fetchSelectedGame();
      setModalOpen(true);
    }
  }, [selectedGame]);

  function handleGameClick(game) {
    if (token) {
      setSelectedGame(game);
    } else {
      setLoginRequiredModalOpen(true);
    }
  }

  function handleLoginRedirect() {
    navigate("/login");
  }

  function handleClose() {
    setModalOpen(false);
  }

  return (
    <Container>
      {games.map((game) => (
        <GameCard
          key={game.game_id}
          game={game}
          onGameClick={handleGameClick}
        />
      ))}
      {gameCollection && (
        <ProposeModal
          game={gameCollection}
          loggedUserCollection={userCollection}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
        />
      )}
      <LoginRequiredModal
        isOpen={isLoginRequiredModalOpen}
        onRequestClose={() => setLoginRequiredModalOpen(false)}
        onLoginRedirect={handleLoginRedirect}
      />
    </Container>
  );
}
