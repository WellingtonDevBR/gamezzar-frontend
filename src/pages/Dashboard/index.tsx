// External Libraries
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

// Styling
import {
  Container,
  LeftSideMenuContainer,
  ImageContainer,
  NavigationContainer,
  SpanOptionButton,
  RightSideContainer,
} from "./styles";

// Components
import { Opportunities } from "./components/Opportunities";
import { Proposal } from "./components/Proposals";
import { Collection } from "./components/Collection";
import { Trades } from "./components/Trades";
import { Profile } from "./components/Profile";
import { Preferences } from "./components/Preferences";
import { TradeHistory } from "./components/TradeHistory";
import { Following } from "./components/Following";
import { Wishlist } from "./components/Wishlist";

// Services
import { getAxiosInstance } from "../../services/axios";

export function Dashboard() {
  // State Initialization
  const [user, setUser] = useState<any>();
  const [wishlist, setWishlist] = useState();

  // Navigational Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Derived State
  const token = Cookies.get("token");
  const [activeTab, setActiveTab] = useState(
    location.state?.tab || "Opportunities"
  );

  // Check user's login status
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Fetch User's Wishlist
  async function getWishList() {
    const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get("/api/wishlist/");
    setWishlist(response.data);
  }

  // Fetch User's Details
  async function getLoginDetails() {
    const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get("/api/user/details");
    setUser(response.data);
  }

  // Effect to load data when component mounts
  useEffect(() => {
    getWishList();
    getLoginDetails();
  }, []);

  return (
    <Container>
      <LeftSideMenuContainer>
        <ImageContainer>
          <img
            src={
              user?.avatar
                ? `${import.meta.env.VITE_S3_URL}/avatar/${user.avatar}`
                : "https://gamezzar-images.s3.us-east-2.amazonaws.com/avatar/avatar1.svg"
            }
            alt="avatar"
          />
          <p>
            {user?.first_name} {user?.last_name}
          </p>
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
            backgroundColor={"#DF4949"}
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
              return <Profile user={user} />;
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
