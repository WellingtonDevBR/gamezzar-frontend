import { useState } from "react";
import {
  Flex,
  Heading,
  Button,
  Box,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";
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
      <Heading as="h1" size="lg" fontWeight="bold">
        Top Trending
      </Heading>
      <Carousel data={newData} />
    </>
  );
}

const Carousel: React.FC<any> = ({ data }: any) => {
  const [current, setCurrent] = useState(0);
  const itemsPerRow = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  });

  const next = () => {
    setCurrent(current === itemsPerRow - 1 ? 0 : current + 1);
  };

  const prev = () => {
    setCurrent(current === 0 ? itemsPerRow - 1 : current - 1);
  };

  return (
    <Box>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={6}
      >
        {data
          .slice(current, current + itemsPerRow)
          .map((item: ICardData, index: number) => (
            <TrendingCard key={index} item={item} />
          ))}
      </Grid>
      <Flex justifyContent="center" alignItems="center" gap={4} mt={6}>
        <Button
          onClick={prev}
          disabled={current === 0}
          variant="ghost"
          colorScheme="whiteAlpha"
        >
          &#8612;
        </Button>
        <Button
          onClick={next}
          disabled={current === itemsPerRow - 1}
          variant="ghost"
          colorScheme="whiteAlpha"
        >
          &#8614;
        </Button>
      </Flex>
    </Box>
  );
};