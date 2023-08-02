import React from "react";
import { Box, Image, Tooltip, useToast, Grid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Game {
  wishlist: {
    details: {
      title: string;
      image: string;
      game_id: string;
      platform: {
        name: string;
      };
    };
  };
}

interface WishlistProps {
  wishlists: Game[];
}

export const Wishlist: React.FC<WishlistProps> = ({ wishlists }) => {
  console.log(wishlists);
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = (game_id: string) => {
    toast({
      title: "Redirecting...",
      description: "You're being redirected to game page",
      status: "info",
      duration: 2000,
      isClosable: true,
    });

    navigate(`/game/${game_id}`);
  };

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
      gap={6}
      mt="20px"
      mb="20px"
    >
      {wishlists.map((game) => (
        <Box
          key={game.wishlist.details.title}
          onClick={() => handleClick(game.wishlist.details.game_id)}
          cursor="pointer"
        >
          <Tooltip label={game.wishlist.details.title} fontSize="md">
            <Image
              boxSize="100%"
              objectFit="cover"
              src={`${import.meta.env.VITE_S3_URL}/games/${
                game.wishlist.details.image
              }`}
              alt={game.wishlist.details.title}
            />
          </Tooltip>
        </Box>
      ))}
    </Grid>
  );
};
