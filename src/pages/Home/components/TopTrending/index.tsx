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

export interface IUser {
  user_id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  avatar: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  inventory: {
    user_id: string;
    game_id: string;
    quantity: number;
    status: boolean;
    created_at: string;
    updated_at: string;
  };
}

interface IGame {
  game_id: string;
  title: string;
  description: string;
  region: string;
  release_date: string;
  producer: string;
  genre: string;
  category: string;
  official_link: string;
  image: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: IUser;
}

export interface TopTrendingProps {
  products: IGame[];
}

export function TopTrending({ products }: TopTrendingProps) {

  const newData = products.map((product) => {
    return {
      imageUrl: `${import.meta.env.VITE_S3_URL}/games/${product.image}`,
      title: product.title,
      subtitle: "BSC",
      footerImg: `${import.meta.env.VITE_S3_URL}/avatar/${product.user.avatar}`,
      creatorLabel: product.user.user_name,
      creatorName: product.user.user_name,
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

interface CarouselProps {
  data: ICardData[];
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
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
