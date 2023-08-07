import React, { useState } from "react";
import _, { groupBy } from "lodash";
import {
  Section,
  UserGameContainer,
  VersionRegionContainer,
  UserFeedBackContainer,
  ProposeContainer,
  MainContainer,
  DispositionSpan,
} from "./styles";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useTheme,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import bookletImg from "../../assets/booklet.svg";
import discImg from "../../assets/disc.svg";
import coverImg from "../../assets/cover.svg";
import {
  COVER_CONDITION,
  DISC_CONDITION,
  DISPOSITION,
  MANUAL_CONDITION,
} from "../../helper/constants";
import { getCityAndState } from "../../helper/cityState";
import { getAxiosInstance } from "../../services/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { StarsMapping } from "../../helper/startsMapping";

interface Game {
  game_id: number;
  disposition: number;
  satisfaction: number;
  disc_condition: number;
  manual_condition: number;
  cover_condition: number;
  item: {
    game_id: number;
    title: string;
    platform: {
      name: string;
    };
    edition: {
      name: string;
    };
    region: {
      name: string;
    };
    image: string;
  };
  user: {
    user_id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    address: {
      address: string;
    };
  };
}

interface UserCollectionItem {
  item: {
    game_id: number;
    title: string;
    platform: {
      name: string;
    };
  };
}

interface ProposeModalProps {
  game: Game;
  loggedUserCollection: UserCollectionItem[];
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

export function ProposeModal({
  game,
  loggedUserCollection,
  isModalOpen,
  setModalOpen,
}: ProposeModalProps) {
  const [selectedGameId, setSelectedGameId] = useState("");
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const gamesByPlatform: _.Dictionary<UserCollectionItem[]> = _.groupBy(
    loggedUserCollection,
    (game: any) => game.item.platform.name
  );
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGameId(event.target.value);
  };

  const handleProposeClick = async () => {
    setLoading(true);
    try {
      const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post("/api/propose/", {
        bidder_game_id: selectedGameId,
        receiver_game_id: game.game_id,
        receiver_id: game.user.user_id,
        status: "pending",
      });

      if (response.status == 201) {
        navigate("/dashboard");
        // Use toast to show a success message
        toast({
          title: "Trade request sent successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setModalOpen(false);
        window.location.reload();
      }
    } catch (error) {
      // Handle error as needed
    } finally {
      setLoading(false); // Set loading to false to hide spinner
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent
        background="linear-gradient(
          24deg,
          rgba(12, 7, 27, 1) 0%,
          rgba(21, 6, 69, 1) 19%,
          rgba(3, 1, 9, 1) 54%,
          rgba(6, 3, 47, 1) 100%
        );"
        color="white"
        mx="auto"
        my="auto"
        width="90vw"
        maxW="1000px"
        borderRadius="8px"
      >
        <ModalHeader
          p="1em"
          background="#7042f"
          borderBottom="1px solid #5142fc"
        >
          Game Detail
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody px="20px" py="2.5em">
          <Section>
            <img
              src={`${import.meta.env.VITE_S3_URL}/games/${game.item.image}`}
              alt={game.item.title}
            />
            <UserGameContainer>
              <h1>{game.item.title}</h1>
              <VersionRegionContainer>
                <div>
                  <b>Version</b>
                  <span>
                    {game.item.edition.name ? game.item.edition.name : "Normal"}
                  </span>
                </div>
                <div>
                  <b>Region</b>
                  <span>
                    {game.item.region.name ? game.item.region.name : "Oceania"}
                  </span>
                </div>
              </VersionRegionContainer>
              <UserFeedBackContainer>
                <section>
                  <img
                    src={`${import.meta.env.VITE_S3_URL}/avatar/${
                      game.user.avatar
                    }`}
                    alt="User Image"
                  />
                  <div>
                    <h1>
                      {`${game.user.first_name} ${game.user.last_name}`}{" "}
                      <span>1</span>
                    </h1>
                    <p>
                      {game.user.address.address
                        ? getCityAndState(game.user.address.address)
                        : "Address Not Set"}
                    </p>
                  </div>
                </section>
                <section>
                  <b>
                    <h2>Overall Feedback 10</h2>
                  </b>
                </section>
              </UserFeedBackContainer>
            </UserGameContainer>
          </Section>
          <ProposeContainer>
            <p>Trade Offer</p>
            <select onChange={handleSelectChange}>
              <option value="">Select a Game</option>
              {Object.entries(gamesByPlatform).map(([platform, games]) => (
                <optgroup key={platform} label={platform}>
                  {games?.map((game) => (
                    <option key={game.item.game_id} value={game.item.game_id}>
                      {game.item.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <button
              type="button"
              onClick={handleProposeClick}
              disabled={loading}
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </ProposeContainer>
          <MainContainer>
            <section>
              <div>
                <img src={discImg} alt="disc" />
                <h1>Disc</h1>
              </div>
              <div>{StarsMapping(game.disc_condition)}</div>
              <p>{DISC_CONDITION[game.disc_condition]}</p>
            </section>
            <section>
              <div>
                <img src={coverImg} alt="cover" />
                <h1>Cover</h1>
              </div>
              <div>
                <div>{StarsMapping(game.cover_condition)}</div>
              </div>
              <p>{MANUAL_CONDITION[game.cover_condition]}</p>
            </section>
            <section>
              <div>
                <img src={bookletImg} alt="manual" />
                <h1>Manual</h1>
              </div>
              <div>
                <div>{StarsMapping(game.manual_condition)}</div>
              </div>
              <p>{COVER_CONDITION[game.manual_condition]}</p>
            </section>
          </MainContainer>
          <DispositionSpan disposition={game.disposition}>
            {DISPOSITION[game.disposition]}
          </DispositionSpan>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
const colorMapping = [
  "#ff6f6f", // red
  "#ffce8a", // light yellow
  "#ffc300", // medium yellow
  "#9ec6ff", // light blue
  "#b1b1ff", // blue
  "#b2efb2", // light green
  "#8cff8c", // green
];
