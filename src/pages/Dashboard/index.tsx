// External Libraries
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Box, Button, Image, Text, VStack, Avatar } from "@chakra-ui/react";

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
import { useTabContext } from "../../context/DashboardContext";
import { HStack } from "@chakra-ui/react";

export function Dashboard() {
  // State Initialization
  const [user, setUser] = useState<any>();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [userGames, setUserGames] = useState<any[]>([]);
  const [wishlistGames, setWishlistGames] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const [followees, setFollowees] = useState<any[]>([]);

  // Navigational Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Derived State
  const token = Cookies.get("token");
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // Context
  const { activeTab, setActiveTab } = useTabContext();

  // Optionally set the initial activeTab on component mount
  useEffect(() => {
    setActiveTab(location.state?.tab || "Opportunities");
  }, []);

  // Check user's login status
  if (!token) {
    return <Navigate to="/login" replace />;
  }

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

  // Fetch User's Transactions
  async function getTransactions() {
    const response = await axios.get("/api/transaction/");
    setTransactions(response.data);
  }

  // Fetch User's Proposals
  async function getProposals() {
    const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get("/api/propose/all");
    setUserId(response.data.user_id);
    setProposals(response.data.proposals);
  }

  // Fetch User Followees
  async function getFollowees() {
    const response = await axios.get("/api/user/follow/");
    setFollowees(response.data);
  }

  // Effect to load data when component mounts
  useEffect(() => {
    getWishList();
    getLoginDetails();
    getTransactions();
    getProposals();
    getFollowees();
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
    const matchedGames = wishlist
      .map((wishlistGame) => {
        const userGame = userGames.find(
          (userGame) =>
            userGame.game_id === wishlistGame.game_id &&
            userGame.user.user_id !== wishlistGame.user.user_id
        );

        // bidder and bidden has the same wish and collection matching
        if (!userGame?.user?.wishlist?.details?.image) {
          return null;
        }

        return {
          // User Account
          bidder: {
            game_id: wishlistGame.game_id,
            game_title: wishlistGame.details.title,
            game_image: wishlistGame.details.image,
            user_id: wishlistGame.user.user_id,
            first_name: wishlistGame.user.first_name,
            last_name: wishlistGame.user.last_name,
            avatar: wishlistGame.user.avatar,
            address: wishlistGame.user.address?.address,
          },
          // Receiver Account
          receiver: {
            game_id: userGame.user.wishlist.details.game_id,
            game_title: userGame.user.wishlist.details.title,
            game_image: userGame.user.wishlist.details.image,
            user_id: userGame?.user?.user_id,
            first_name: userGame?.user?.first_name,
            last_name: userGame?.user?.last_name,
            avatar: userGame?.user?.avatar,
            address: userGame?.user?.address?.address,
          },
        };
      })
      .filter((game) => game !== null); // Filter out the null values
    setWishlistGames(matchedGames);
  }, [userGames]);

  return (
    <Box
      d="flex"
      flexDirection="row"
      h="100%"
      w="1000px"
      m="50px auto"
      mt="50px"
      justifyContent="center"
    >
      <HStack alignItems="right">
        <VStack w="200px" h="100%" spacing="20px">
          <Box d="flex" flexDirection="column">
            <Avatar
              src={
                user?.avatar
                  ? `${import.meta.env.VITE_S3_URL}/avatar/${user.avatar}`
                  : "https://gamezzar-images.s3.us-east-2.amazonaws.com/avatar/avatar1.svg"
              }
              alt="avatar"
              w="80px"
              h="80px"
            />
            <Text>
              {user?.first_name} {user?.last_name}
            </Text>
          </Box>
          <VStack
            d="flex"
            flexDirection="column"
            bg="#5142FC"
            justifyContent="center"
            width="100%"
            borderRadius="10px"
          >
            <Button
              bg={activeTab === "Opportunities" ? "#3f32ca" : "#5142FC"} // Change the background color based on the active tab
              _hover={{ bg: "#3f32ca" }}
              _active={{ bg: "#31279e" }}
              width="100%"
              p="30px"
              onClick={() => setActiveTab("Opportunities")}
            >
              Opportunities
            </Button>
            <Button
              bg={activeTab === "Proposals" ? "#3f32ca" : "#5142FC"} // Change the background color based on the active tab
              _hover={{ bg: "#3f32ca" }}
              _active={{ bg: "#31279e" }}
              width="100%"
              p="30px"
              onClick={() => setActiveTab("Proposals")}
            >
              Proposals
            </Button>
            <Button
              bg={activeTab === "Trades" ? "#3f32ca" : "#5142FC"}
              _hover={{ bg: "#3f32ca" }}
              _active={{ bg: "#31279e" }}
              width="100%"
              p="30px"
              onClick={() => setActiveTab("Trades")}
            >
              Ongoing Trades
            </Button>
            <Button
              bg={activeTab === "Wishlist" ? "#3f32ca" : "#5142FC"}
              _hover={{ bg: "#3f32ca" }}
              _active={{ bg: "#31279e" }}
              width="100%"
              p="30px"
              onClick={() => setActiveTab("Wishlist")}
            >
              Wishlist
            </Button>
            <Button
              bg={activeTab === "Collection" ? "#3f32ca" : "#5142FC"}
              _hover={{ bg: "#3f32ca" }}
              _active={{ bg: "#31279e" }}
              width="100%"
              p="30px"
              onClick={() => setActiveTab("Collection")}
            >
              My Collection
            </Button>
            <Button
              bg={activeTab === "History" ? "#3f32ca" : "#5142FC"}
              _hover={{ bg: "#3f32ca" }}
              _active={{ bg: "#31279e" }}
              width="100%"
              p="30px"
              onClick={() => setActiveTab("History")}
            >
              Trade History
            </Button>
            <Button
              bg={activeTab === "Following" ? "#3f32ca" : "#5142FC"}
              _hover={{ bg: "#3f32ca" }}
              _active={{ bg: "#31279e" }}
              width="100%"
              p="30px"
              onClick={() => setActiveTab("Following")}
            >
              Following
            </Button>
            <Button
              bg={activeTab === "Preferences" ? "#3f32ca" : "#5142FC"}
              _hover={{ bg: "#3f32ca" }}
              _active={{ bg: "#31279e" }}
              width="100%"
              p="30px"
              onClick={() => setActiveTab("Preferences")}
            >
              Preferences
            </Button>
            <Button
              bg={activeTab === "Profile" ? "#3f32ca" : "#5142FC"}
              _hover={{ bg: "#3f32ca" }}
              _active={{ bg: "#31279e" }}
              width="100%"
              p="30px"
              onClick={() => setActiveTab("Profile")}
            >
              Edit Profile
            </Button>
          </VStack>
        </VStack>
        {(() => {
          switch (activeTab) {
            case "Opportunities":
              return <Opportunities wishlist={wishlistGames} />;
            case "Proposals":
              return <Proposal proposals={proposals} userId={userId} />;
            case "Trades":
              return <Trades proposals={proposals} />;
            case "Wishlist":
              return <Wishlist wishlist={wishlist} />;
            case "Collection":
              return <Collection />;
            case "History":
              return (
                <TradeHistory transactions={transactions} userId={userId} />
              );
            case "Following":
              return (
                <Following
                  followees={followees}
                  token={token}
                  setFollowees={setFollowees}
                />
              );
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
      </HStack>
    </Box>
  );
}
