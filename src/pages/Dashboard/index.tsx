import { useState } from "react";
import {
  Container,
  LeftSideMenuContainer,
  ImageContainer,
  NavigationContainer,
  SpanOptionButton,
  RightSideContainer,
} from "./styles";
import { Opportunities } from "./components/Opportunities";
import { Proposal } from "./components/Proposals";
import { Collection } from "./components/Collection";
import { Trades } from "./components/Trades";
import { Profile } from "./components/Profile";
import { Preferences } from "./components/Preferences";
import { Wishlist } from "./components/Wishlist";
import { TradeHistory } from "./components/TradeHistory";
import { Following } from "./components/Following";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("Opportunities");
  return (
    <Container>
      <LeftSideMenuContainer>
        <ImageContainer>
          <img
            src="https://gamezzar-images.s3.us-east-2.amazonaws.com/avatar/avatar1.svg"
            alt=""
          />
          <p>Wellington Santos</p>
        </ImageContainer>
        <NavigationContainer>
          <SpanOptionButton onClick={() => setActiveTab("Opportunities")}>
            Opportunities
          </SpanOptionButton>
          <SpanOptionButton onClick={() => setActiveTab("Proposals")}>
            Proposals
          </SpanOptionButton>
          <SpanOptionButton onClick={() => setActiveTab("Trades")}>
            Ongoing Trades
          </SpanOptionButton>
          <SpanOptionButton onClick={() => setActiveTab("Wishlist")}>
            Wishlist
          </SpanOptionButton>
          <SpanOptionButton onClick={() => setActiveTab("Collection")}>
            My Collection
          </SpanOptionButton>
          <SpanOptionButton onClick={() => setActiveTab("History")}>
            Trade History
          </SpanOptionButton>
          <SpanOptionButton onClick={() => setActiveTab("Following")}>
            Following
          </SpanOptionButton>
          <SpanOptionButton onClick={() => setActiveTab("Preferences")}>
            Preferences
          </SpanOptionButton>
          <SpanOptionButton onClick={() => setActiveTab("Profile")}>
            Edit Profile
          </SpanOptionButton>
        </NavigationContainer>
      </LeftSideMenuContainer>
      <RightSideContainer>
        {(() => {
          switch (activeTab) {
            case "Opportunities":
              return <Opportunities />;
            case "Proposals":
              return <Proposal />;
            case "Trades":
              return <Trades />;
            case "Wishlist":
              return <Wishlist />;
            case "Collection":
              return <Collection />;
            case "History":
              return <TradeHistory />;
            case "Following":
              return <Following />;
            case "Preferences":
              return <Preferences />;
            case "Profile":
              return <Profile />;
            default:
              return null;
          }
        })()}
      </RightSideContainer>
    </Container>
  );
}
