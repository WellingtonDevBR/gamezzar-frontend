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
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [userGames, setUserGames] = useState<any[]>([]);
  const [wishlistGames, setWishlistGames] = useState<any[]>([]);

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

  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // Fetch User's Wishlist
  async function getWishList() {
    const response = await axios.get("/api/wishlist/");
    setWishlist(response.data);
  }

  // Fetch User's Details
  async function getLoginDetails() {
    const response = await axios.get("/api/user/details");
    setUser(response.data);
  }

  // Effect to load data when component mounts
  useEffect(() => {
    getWishList();
    getLoginDetails();
  }, []);

  useEffect(() => {
    // Fetch UserGame
    async function getUserGame() {
      const promises = wishlist.map((game) => {
        return axios.get(
          `/api/user-collection/collection/${game.details.game_id}`
        );
      });

      try {
        const responses = await Promise.all(promises);
        const userGames = responses.map((response) => response.data);
        setUserGames(userGames);
      } catch (error) {
        console.error("Error fetching user games:", error);
        // Handle the error if necessary
      }
    }
    getUserGame();
  }, [wishlist]);

  useEffect(() => {
    const matchedGames = wishlist.map((wishlistGame) => {
      const userGame = userGames.find(
        (userGame) => userGame.game_id === wishlistGame.game_id
      );
      return {
        // User Account
        game_one_game_id: wishlistGame.details.game_id,
        game_one_title: wishlistGame.details.title,
        game_one_image: wishlistGame.details.image,
        user_one_user_id: wishlistGame.user.user_id,
        user_one_first_name: wishlistGame.user.first_name,
        user_one_last_name: wishlistGame.user.last_name,
        user_one_avatar: wishlistGame.user.avatar,
        // Another Acount User
        game_two_game_id: userGame.user.wishlist.details.game_id,
        game_two_title: userGame.user.wishlist.details.title,
        game_two_image: userGame.user.wishlist.details.image,
        user_two_user_id: userGame?.user?.user_id,
        user_two_first_name: userGame?.user?.first_name,
        user_two_last_name: userGame?.user?.last_name,
        user_two_avatar: userGame?.user?.avatar,
        user_two_address: userGame?.user?.address?.address,
      };
    });
    setWishlistGames(matchedGames);
  }, [userGames]);

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
              return <Opportunities wishlist={wishlistGames} />;
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
