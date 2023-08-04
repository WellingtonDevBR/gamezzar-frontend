import React, { useState } from "react";
import {
  Container,
  InputListContainer,
  HeaderSectionContainer,
  InputBoxContainer,
  FeedbackContainer,
  TradedGamesContainer,
  TradesImagesContainer,
  TradesProfileContainer,
  SpanOptionContainer,
} from "./styles";
import { MessageBox } from "../Proposals/components/MessageBox";
import { TradeBox } from "./TradeBox";
import {
  Box,
  Flex,
  Text,
  Select,
  Checkbox,
  Spacer,
  Avatar,
  Button,
} from "@chakra-ui/react";

export function Opportunities({ wishlist }) {
  const [isTradeBoxOpen, setIsTradeBoxOpen] = useState(false);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);

  const handleMessageClick = (game) => {
    console.log(game);
    const proposal = {
      interested_game_id: game.game_two_game_id,
      interested_user_id: game.user_two_user_id,
      owner_game_id: game.game_one_game_id,
      owner_user_id: game.user_one_user_id,
      sender: {
        user_id: game.user_two_user_id, // Replace with the actual receiver ID
        first_name: game.user_two_first_name,
        last_name: game.user_two_last_name,
        avatar: game.user_two_avatar,
      },
      receiver: {
        user_id: game.user_one_user_id, // Replace with the actual sender ID
        first_name: game.user_one_first_name, // Replace with the actual sender first name
        last_name: game.user_one_last_name, // Replace with the actual sender last name
        avatar: game.user_one_avatar,
      },
    };
    setCurrentGame(proposal);
    setIsMessageBoxOpen(true);
  };

  const handleTradeClick = (game) => {
    // your logic for handling the trade click event
    setCurrentGame(game);
    setIsTradeBoxOpen(true);
  };

  return (
    <Box
      w="700px"
      mt="20px"
      p="20px"
      borderRadius="5px"
      boxShadow="0px 0px 5px 0px rgba(0, 0, 0, 0.2)"
    >
      <Flex flexDirection="column">
        <Text fontSize="24px" fontWeight="bold" mb="45px">
          Opportunities
        </Text>
        <InputListContainer>
          <HeaderSectionContainer>
            <Text>My Wishlist</Text>
            <Select placeholder="Select your option" fontWeight="bold" size="lg">
              <option value="steam">Steam</option>
              <option value="psn">PSN</option>
              <option value="xbox">Xbox</option>
              <option value="nintendo">Nintendo</option>
            </Select>
          </HeaderSectionContainer>
          <HeaderSectionContainer>
            <Text>My Collection</Text>
            <Select placeholder="Select your option" fontWeight="bold">
              <option value="steam">Steam</option>
              <option value="psn">PSN</option>
              <option value="xbox">Xbox</option>
              <option value="nintendo">Nintendo</option>
            </Select>
          </HeaderSectionContainer>
        </InputListContainer>
        <InputBoxContainer>
          <Checkbox defaultIsChecked>Only people I follow</Checkbox>
        </InputBoxContainer>
      </Flex>
      {wishlist.map((game, index) => {
        return (
          <FeedbackContainer key={index}>
            <TradedGamesContainer>
              <TradesImagesContainer>
                <img
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    game.game_one_image
                  }`}
                  alt={`${game.game_one_title}`}
                />
                <img
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    game.game_two_image
                  }`}
                  alt={`${game.game_two_title}`}
                />
              </TradesImagesContainer>
              <TradesProfileContainer>
                <div>
                  <Avatar
                    src={`${import.meta.env.VITE_S3_URL}/avatar/${
                      game.user_two_avatar
                    }`}
                    alt={game.user_two_first_name}
                  />
                  <div>
                    <p>
                      {game.user_two_first_name} {game.user_two_last_name}{" "}
                      <span>36</span>
                    </p>
                    <span>Sydney / SP</span>
                  </div>
                </div>
                <div>
                  <Button
                    bg="#6c757d"
                    color="white"
                    borderRadius="5px"
                    _hover={{ filter: "brightness(85%)" }}
                    onClick={() => handleMessageClick(game)}
                  >
                    Message
                  </Button>
                  <Button
                    bg="#5142FC"
                    color="white"
                    borderRadius="5px"
                    _hover={{ filter: "brightness(85%)" }}
                    onClick={() => handleTradeClick(game)}
                  >
                    Trade
                  </Button>
                  {isTradeBoxOpen && (
                    <TradeBox
                      isOpen={isTradeBoxOpen}
                      onClose={() => setIsTradeBoxOpen(false)}
                      proposal={currentGame}
                    />
                  )}
                </div>
              </TradesProfileContainer>
            </TradedGamesContainer>
            {isMessageBoxOpen && (
              <MessageBox
                onClose={() => setIsMessageBoxOpen(false)}
                proposal={currentGame}
                isSender={true} // modify this prop depending on the logic of who is the sender
              />
            )}
          </FeedbackContainer>
        );
      })}
    </Box>
  );
}
