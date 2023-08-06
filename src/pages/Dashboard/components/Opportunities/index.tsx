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

  const handleMessageClick = (trade) => {
    const proposal = {
      bidder: {
        user_id: trade.bidder.user_id,
        first_name: trade.bidder.first_name,
        last_name: trade.bidder.last_name,
        avatar: trade.bidder.avatar,
        address: trade?.bidder?.address,
        game_id: trade.bidder.game_id,
        game_title: trade.bidder.game_title,
        game_image: trade.bidder.game_image,
      },
      receiver: {
        user_id: trade.receiver.user_id,
        first_name: trade.receiver.first_name,
        last_name: trade.receiver.last_name,
        avatar: trade.receiver.avatar,
        address: trade?.receiver?.address,
        game_id: trade.receiver.game_id,
        game_title: trade.receiver.game_title,
        game_image: trade.receiver.game_image,
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
            <Select
              placeholder="Select your option"
              fontWeight="bold"
              size="lg"
            >
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
      {wishlist.map((trade, index) => {
        return (
          <FeedbackContainer key={index}>
            <TradedGamesContainer>
              <TradesImagesContainer>
                <img
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    trade.bidder.game_image
                  }`}
                  alt={`${trade.bidder.game_title}`}
                />
                <img
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    trade.receiver.game_image
                  }`}
                  alt={`${trade.receiver.title}`}
                />
              </TradesImagesContainer>
              <TradesProfileContainer>
                <div>
                  <Avatar
                    src={`${import.meta.env.VITE_S3_URL}/avatar/${
                      trade.receiver.avatar
                    }`}
                    alt={trade.receiver.avatar}
                  />
                  <div>
                    <p>
                      {trade.receiver.first_name} {trade.receiver.last_name}{" "}
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
                    onClick={() => handleMessageClick(trade)}
                  >
                    Message
                  </Button>
                  <Button
                    bg="#5142FC"
                    color="white"
                    borderRadius="5px"
                    _hover={{ filter: "brightness(85%)" }}
                    onClick={() => handleTradeClick(trade)}
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
                isOpen={isMessageBoxOpen}
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
