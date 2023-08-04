import { Box, Button, Tooltip, useDisclosure } from "@chakra-ui/react";

export function GameCard({ game, onGameClick }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getDispositionColor = (disposition) => {
    if (disposition <= 2) return "red";
    else if (disposition <= 4) return "yellow";
    else return "green";
  };

  return (
    <Box
      w="150px" // Changed from 200px to 150px
      h="150px" // Changed from 200px to 150px
      m="10px"
      backgroundSize="cover"
      position="relative"
      backgroundPosition="center"
      borderRadius="5px"
      overflow="hidden"
      backgroundImage={`url(${import.meta.env.VITE_S3_URL}/games/${
        game.image
      })`}
      _hover={{ cursor: "pointer" }} // changed hover styles
    >
      <Tooltip label={game.title} fontSize="md">
        <Button
          w="100%"
          h="100%"
          p="0"
          background="none"
          onClick={() => {
            onGameClick(game);
            onOpen();
          }}
        >
          <Box
            w="100%"
            h="100%"
            backgroundImage={`url(${import.meta.env.VITE_S3_URL}/games/${
              game.image
            })`}
            backgroundSize="cover"
            backgroundPosition="center"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.1)" }}
          />
          <Box
            w="20px"
            h="20px"
            bgColor={getDispositionColor(game.disposition)}
            borderRadius="50%"
            position="absolute"
            bottom="10px"
            right="10px"
          />
        </Button>
      </Tooltip>
      {/* Your Modal Component Goes Here */}
    </Box>
  );
}
