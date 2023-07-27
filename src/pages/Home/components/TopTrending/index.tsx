import {
  CarouselContainer,
  Navigation,
  NavigationButton,
  Ellipsis,
  CircleDot,
  CarouselList,
} from "./styles";
import { useState } from "react";
import { ICardData } from "./utils";
import { TrendingCard } from "./TopTrendingCard";

interface GameProps {
  game_id: string;
  title: string;
  description: string;
  release_date: string;
  producer: string;
  official_link: string;
  image: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface TopTrendingProps {
  games: GameProps[];
}

interface CarouselProps {
  data: GameProps[];
}

export function TopTrending({ games }: TopTrendingProps) {
  const newData = games.map((game: GameProps) => {
    return {
      gameId: game.game_id,
      imageUrl: `${import.meta.env.VITE_S3_URL}/games/${game.image}`,
      title: game.title,
    };
  });

  return (
    <>
      <header>
        <h1>Top Trending</h1>
      </header>
      <Carousel data={newData} />
    </>
  );
}

const Carousel: React.FC<any> = ({ data }: any) => {
  const [current, setCurrent] = useState(0);
  const pages = Math.ceil(data.length / 5);

  const next = () => {
    setCurrent(current === data.length - 5 ? 0 : current + 1);
  };

  const prev = () => {
    setCurrent(current === 0 ? data.length - 5 : current - 1);
  };

  return (
    <CarouselContainer>
      <CarouselList>
        {data.slice(current, current + 5).map((item, index) => (
          <TrendingCard key={index} item={item} />
        ))}
      </CarouselList>

      <Navigation>
        <NavigationButton onClick={prev} disabled={current === 0}>
          &#8612;
        </NavigationButton>
        <Ellipsis>
          {Array.from({ length: pages }, (_, index) => (
            <CircleDot key={index} active={current === index} />
          ))}
        </Ellipsis>
        <NavigationButton onClick={next} disabled={current === data.length - 4}>
          &#8614;
        </NavigationButton>
      </Navigation>
    </CarouselContainer>
  );
};
