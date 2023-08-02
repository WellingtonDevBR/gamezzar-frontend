import React, { useState } from "react";
import _, { groupBy } from "lodash";
import {
  CloseButton,
  Container,
  ModalOverlay,
  Section,
  UserGameContainer,
  VersionRegionContainer,
  UserFeedBackContainer,
  ProposeContainer,
  MainContainer,
  DispositionSpan,
  Header,
} from "./styles";

import bookletImg from "../../assets/booklet.svg";
import discImg from "../../assets/disc.svg";
import coverImg from "../../assets/cover.svg";
import { Star } from "phosphor-react";
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

interface Game {
  user_id: number;
  game_id: number;
  title: string;
  image: string;
  edition: {
    name: string;
  };
  region: {
    name: string;
  };
  user: {
    user_id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    address: {
      address: string;
    };
    inventory: {
      disc_condition: number;
      cover_condition: number;
      manual_condition: number;
      disposition: number;
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
      setModalOpen(false);
      window.location.reload();
    }
  };

  return (
    <>
      {isModalOpen && (
        <>
          <ModalOverlay onClick={closeModal} />
          <Container>
            <Header>
              <p>Game Detail</p>
            </Header>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <Section>
              <img
                src={`${import.meta.env.VITE_S3_URL}/games/${game.image}`}
                alt={game.title}
              />
              <UserGameContainer>
                <h1>{game.title}</h1>
                <VersionRegionContainer>
                  <div>
                    <b>Version</b>
                    <span>{game.edition.name}</span>
                  </div>
                  <div>
                    <b>Region</b>
                    <span>{game.region.name}</span>
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
                      <option
                        key={game.item.game_id}
                        value={game.item.game_id}
                      >
                        {game.item.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <button type="button" onClick={handleProposeClick}>
                Submit
              </button>
            </ProposeContainer>
            <MainContainer>
              <section>
                <div>
                  <img src={discImg} alt="disc" />
                  <h1>Disc</h1>
                </div>
                <div>{StarsMapping(game.user.inventory.disc_condition)}</div>
                <p>{DISC_CONDITION[game.user.inventory.disc_condition]}</p>
              </section>
              <section>
                <div>
                  <img src={coverImg} alt="cover" />
                  <h1>Cover</h1>
                </div>
                <div>
                  <div>{StarsMapping(game.user.inventory.cover_condition)}</div>
                </div>
                <p>{MANUAL_CONDITION[game.user.inventory.cover_condition]}</p>
              </section>
              <section>
                <div>
                  <img src={bookletImg} alt="manual" />
                  <h1>Manual</h1>
                </div>
                <div>
                  <div>
                    {StarsMapping(game.user.inventory.manual_condition)}
                  </div>
                </div>
                <p>{COVER_CONDITION[game.user.inventory.manual_condition]}</p>
              </section>
            </MainContainer>
            <DispositionSpan disposition={game.user.inventory.disposition}>
              {DISPOSITION[game.user.inventory.disposition]}
            </DispositionSpan>
          </Container>
        </>
      )}
    </>
  );
}

function StarsMapping(score: number) {
  return (
    <div>
      {Array.from({ length: 7 }, (_, i) => (
        <Star
          key={i}
          color={i < score ? "yellow" : "grey"} // replace 'grey' with your unfilled star color
          weight="fill"
          size={22}
        />
      ))}
    </div>
  );
}
