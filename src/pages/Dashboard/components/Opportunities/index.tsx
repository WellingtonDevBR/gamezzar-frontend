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

export function Opportunities() {
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
      <FeedbackContainer>
        <TradedGamesContainer>
          <TradesImagesContainer>
            <img
              src="https://gamezzar-images.s3.us-east-2.amazonaws.com/games/grand-theft-auto-v.png"
              alt=""
            />
            <img
              src="https://gamezzar-images.s3.us-east-2.amazonaws.com/games/zelda-breath-of-the-wild.svg"
              alt=""
            />
          </TradesImagesContainer>
          <TradesProfileContainer>
            <div>
              <img
                src="https://gamezzar-images.s3.us-east-2.amazonaws.com/avatar/avatar1.svg"
                alt=""
              />
              <div>
                <p>
                  Wellington Santos <span>36</span>
                </p>
                <span>Sydney / SP</span>
              </div>
            </div>
            <div>
              <SpanOptionContainer backgroundColor="#6c757d">
                Message
              </SpanOptionContainer>
              <SpanOptionContainer backgroundColor="#025b87">
                Propose
              </SpanOptionContainer>
            </div>
          </TradesProfileContainer>
        </TradedGamesContainer>
      </FeedbackContainer>
    </Container>
  );
}
