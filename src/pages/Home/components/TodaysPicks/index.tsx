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
import avatarTwoImage from "../../../../assets/avatar2.svg";
import { useState } from "react";
import { TopTrendingProps } from "../TopTrending";
import { S3_BASE_URL } from "../../../../helper/constants";

export function TodaysDeals({ products }: TopTrendingProps) {
  const [visibleRows, setVisibleRows] = useState(2);

  const listOfGames = products.map((product) => ({
    src: `${S3_BASE_URL}/games/${product.image}`,
    alt: `${product.slug}`,
    title: `${product.title}`,
    owner: `${product.user.user_name}`,
    avatar: `${S3_BASE_URL}/avatar/${product.user.avatar}`,
  }));

  const visibleCards = listOfGames.slice(0, visibleRows * 4); // Show 4 cards per row

  return (
    <Container>
      <h1>Today's Picks</h1>
      <CardList>
        {visibleCards.map(
          (card, i) => (
            (
              <Card
                key={i}
                src={card.src}
                alt={card.alt}
                title={card.title}
                owner={card.owner}
                avatar={card.avatar}
              />
            )
          )
        )}
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
