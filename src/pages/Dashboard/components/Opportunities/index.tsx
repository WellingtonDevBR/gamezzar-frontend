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

export function Opportunities({ wishlist }) {
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);

  const handleMessageClick = (game) => {
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

  return (
    <Container>
      <div>
        <h1>Opportunities</h1>
        <InputListContainer>
          <HeaderSectionContainer>
            <p>My Wishlist</p>
            <select name="wishlist" id="wishlist">
              <option value="" disabled selected>
                Select your option
              </option>
              <option value="steam">Steam</option>
              <option value="psn">PSN</option>
              <option value="xbox">Xbox</option>
              <option value="nintendo">Nintendo</option>
            </select>
          </HeaderSectionContainer>
          <HeaderSectionContainer>
            <p>My Collection</p>
            <select name="collection" id="collection">
              <option value="" disabled selected>
                Select your option
              </option>
              <option value="steam">Steam</option>
              <option value="psn">PSN</option>
              <option value="xbox">Xbox</option>
              <option value="nintendo">Nintendo</option>
            </select>
          </HeaderSectionContainer>
        </InputListContainer>
        <InputBoxContainer>
          <div>
            <input type="checkbox" />
            <span>Apenas pessoas que sigo</span>
          </div>
        </InputBoxContainer>
      </div>
      {wishlist.map((game) => {
        return (
          <FeedbackContainer>
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
                  <img
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
                  <SpanOptionContainer
                    backgroundColor="#6c757d"
                    onClick={() => handleMessageClick(game)}
                  >
                    Message
                  </SpanOptionContainer>
                  <SpanOptionContainer backgroundColor="#025b87">
                    Trade
                  </SpanOptionContainer>
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
    </Container>
  );
}
