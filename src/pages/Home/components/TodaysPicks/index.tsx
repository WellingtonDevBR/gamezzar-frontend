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
import { useState } from "react";

interface TodaysDetalsProps {
  usersCollection: any[];
}

export function TodaysDeals({ usersCollection }: TodaysDetalsProps) {
  const [visibleRows, setVisibleRows] = useState(2);

  const listOfGames = usersCollection.map((userCollection: any) => ({
    src: `${import.meta.env.VITE_S3_URL}/games/${userCollection.image}`,
    alt: `${userCollection.slug}`,
    title: `${userCollection.title}`,
    owner: `${userCollection.user.user_name}`,
    avatar: `${import.meta.env.VITE_S3_URL}/avatar/${
      userCollection.user.avatar
    }`,
  }));

  const visibleCards = listOfGames.slice(0, visibleRows * 4); // Show 4 cards per row

  return (
    <Container>
      <h1>Today's Picks</h1>
      <CardList>
        {visibleCards.map((card: any, i: any) => (
          <Card
            key={i}
            src={card.src}
            alt={card.alt}
            title={card.title}
            owner={card.owner}
            avatar={card.avatar}
          />
        ))}
      </CardList>
      {visibleRows * 4 < listOfGames.length && (
        <ShowMoreButton onClick={() => setVisibleRows(visibleRows + 1)}>
          Show more
        </ShowMoreButton>
      )}
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

const Card = ({ src, alt, title, owner, avatar }: CardProps) => (
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
          <Button primary>Trade</Button>
          <button>View History</button>
        </div>
      </CardFooterContent>
    </CardSection>
  </CardContainer>
);
