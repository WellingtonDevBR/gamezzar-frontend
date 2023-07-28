// Components.js
import {
  Container,
  CardList,
  CardContainer,
  CardSection,
  CardFooterContent,
  CardTitle,
  CardOwner,
  OwnerDetails,
  ShowMoreButton,
} from "./styles";
import { Button } from "../../../../components/Button";
import { useEffect, useState } from "react";
import { ProposeModal } from "../../../Game/components/modal";
import Cookie from "js-cookie";
import { NavLink } from "react-router-dom";

interface TodaysDetalsProps {
  usersCollection: any[];
}

export function TodaysDeals({ usersCollection }: TodaysDetalsProps) {
  const token = Cookie.get("token");
  const [visibleRows, setVisibleRows] = useState(2);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userGame, setUserGame] = useState(null);

  const listOfGames = usersCollection.map((userCollection: any) => ({
    src: `${import.meta.env.VITE_S3_URL}/games/${userCollection.image}`,
    alt: `${userCollection.slug}`,
    title: `${userCollection.title}`,
    owner: `${userCollection.user.user_name}`,
    avatar: `${import.meta.env.VITE_S3_URL}/avatar/${
      userCollection.user.avatar
    }`,
  }));

  const visibleCards = listOfGames.slice(0, visibleRows * 4);

  const handleUserGameClick = (index: any) => {
    setModalOpen(true);
    setUserGame(usersCollection[1]);
  };

  return (
    <Container>
      <h1>Today's Picks</h1>
      <CardList>
        {visibleCards.map((card: any, index: any) => (
          <Card
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
      {isModalOpen && <ProposeModal game={userGame} />}
    </Container>
  );
}

interface CardProps {
  src: string;
  alt: string;
  title: string;
  owner: string;
  avatar: string;
}

const Card = ({
  src,
  alt,
  title,
  owner,
  avatar,
  onTradeClick,
  token,
}: CardProps & { onTradeClick: () => void; token: string }) => (
  <CardContainer>
    <img src={src} alt={alt} />
    <CardSection>
      <div>
        <CardTitle>{title}</CardTitle>
      </div>
      <CardFooterContent>
        <CardOwner>
          <img src={avatar} alt="Owner" />
          <OwnerDetails>
            <h3>Owned by</h3>
            <h4>{owner}</h4>
          </OwnerDetails>
        </CardOwner>
        <div>
          {!token ? (
            <>
              <NavLink style={{ all: "revert" }} to="/login">
                <Button style={{ width: "100px", height: "40px" }}>
                  Trade
                </Button>
              </NavLink>
              <button>View History</button>
            </>
          ) : (
            <>
              <Button primary onClick={onTradeClick}>
                Trade
              </Button>
              <button>View History</button>
            </>
          )}
        </div>
      </CardFooterContent>
    </CardSection>
  </CardContainer>
);
