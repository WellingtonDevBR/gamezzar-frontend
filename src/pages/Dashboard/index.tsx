import { useContext, useEffect, useState } from "react";
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
import { TradeHistory } from "./components/TradeHistory";
import { Following } from "./components/Following";
import { useAuth } from "../../context/AuthContext";
import { NavLinkProps, Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { getAxiosInstance } from "../../services/axios";
import { Wishlist } from "./components/Wishlist";

export function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.tab || "Opportunities"
  );
  console.log(activeTab);
  const cookiedToken = Cookies.get("token");

  if (!token && !cookiedToken) {
    return <Navigate to="/login" replace />;
  }

  const [wishlist, setWishlist] = useState();

  useEffect(() => {
    async function getWishList() {
      const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
      axios.defaults.headers.common["Authorization"] = `Bearer ${
        token || cookiedToken
      }`;
      const response = await axios.get("/api/wishlist/");
      setWishlist(response.data);
    }
    getWishList();
  }, []);

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
          <SpanOptionButton
            backgroundColor={"#8c0f0f"}
            onClick={() => setActiveTab("Logout")}
          >
            Logout
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
              return <Wishlist wishlist={wishlist} />;
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
            case "Logout":
              Cookies.remove("token");
              navigate("/login");
              navigate(0);
            default:
              return null;
          }
        })()}
      </RightSideContainer>
    </Container>
  );
}
