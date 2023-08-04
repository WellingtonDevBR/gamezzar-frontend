import { CellSignalFull, Check, Envelope, Info, XCircle } from "phosphor-react";
import React, { useState, ReactNode, useEffect } from "react";
import { Collections } from "./components/Collections";
import {
  Spinner,
  Center,
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  Container,
  HeaderContainer,
  HeaderTopSection,
  HeaderBottomSection,
  HeaderTopContent,
  MainContainer,
  MainSectionContainer,
  MainImageContainer,
  MainContentContainer,
  TabsContainer,
  NavigationTabContainer,
  MainNavigationContainer,
} from "./styles";
import { Feedback } from "./components/Feedbacks";
import { useParams } from "react-router-dom";
import { getAxiosInstance } from "../../services/axios";
import { convertTimeFormat } from "../../helper/convertTimeFormat";
import { Wishlist } from "./components/Wishlist";
import Cookies from "js-cookie";
import { AuthenticationModal } from "../../components/AuthenticationModal";
import { FollowUserModal } from "./components/FollowModal";
import { ReportUserModal } from "./components/ReportModal";
import { Image } from "@chakra-ui/react";

interface UserProps {
  first_name: string;
  last_name: string;
  user_name: string;
  created_at: string;
  avatar: string;
  address: {
    address: string;
  };
  collections: [
    {
      game_id: string;
      title: string;
      disposition: number;
      image: string;
      details: {
        platform: string;
        region: string;
      };
    }
  ];

  preference: {
    shipment_by_courier: boolean;
    shipment_by_postal: boolean;
    shipment_in_person: boolean;
    status_message: string;
  };
}

export function Profile() {
  const [activeTab, setActiveTab] = useState("Feedbacks");
  const [loading, setLoading] = useState(false);
  const [userFeedbacks, setUserFeedbacks] = useState<any[]>([]);
  const [userWishlists, setUserWishlists] = useState<any[]>([]);
  const [isUserBeingFollowed, setIsUserBeingFollowed] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProps>({
    user_name: "",
    created_at: "",
    first_name: "",
    last_name: "",
    avatar: "",
    address: {
      address: "",
    },
    collections: [
      {
        game_id: "",
        title: "",
        disposition: 0,
        image: "",
        details: {
          platform: "",
          region: "",
        },
      },
    ],
    preference: {
      shipment_by_courier: false,
      shipment_by_postal: false,
      shipment_in_person: false,
      status_message: "",
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = Cookies.get("token");
  const { username } = useParams();
  const formattedDate = convertTimeFormat(userProfile.created_at);
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const openFollowModal = () => setIsFollowModalOpen(true);
  const closeFollowModal = () => setIsFollowModalOpen(false);

  const openReportModal = () => setIsReportModalOpen(true);
  const closeReportModal = () => setIsReportModalOpen(false);

  useEffect(() => {
    setLoading(true); // add this line
    const fetchUser = async () => {
      try {
        const result = await axios.get(`/api/user/${username}`);
        setUserProfile(result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const fetchUserFeedback = async () => {
      try {
        const result = await axios.get(`/api/user/${username}/feedbacks`);
        setUserFeedbacks(result.data);
        setLoading(false); // add this line
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const fetchUserWishlist = async () => {
      try {
        const result = await axios.get(`/api/user/${username}/wishlist`);
        console.log(result.data);
        setUserWishlists(result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const fetchIfAlreadyFollowsUser = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(`/api/user/follow/${username}`);
        setIsUserBeingFollowed(!!result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchIfAlreadyFollowsUser();
    fetchUserFeedback();
    fetchUser();
    fetchUserWishlist();
  }, []);

  async function handleFollowUser() {
    if (!token) {
      onOpen();
      return;
    }
    openFollowModal();
  }

  async function handleInboxUser() {
    if (!token) {
      onOpen();
      return;
    }
    try {
      const response = await axios.post(
        `/api/user/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Do something with the response, if necessary.
      console.log(response.data);
    } catch (error) {
      console.error("Failed to follow the user:", error);
    }
  }

  async function handleReportUser() {
    if (!token) {
      onOpen();
      return;
    }
    openReportModal();
  }

  return (
    <Container>
      <HeaderContainer>
        <HeaderTopSection>
          <HeaderTopContent>
            <p>Since</p>
            <b>{formattedDate}</b>
          </HeaderTopContent>
          <HeaderTopContent>
            <p>Recent Access</p>
            <b>{formattedDate}</b>
          </HeaderTopContent>
          <HeaderTopContent>
            <p>Trades</p>
            <b>0</b>
          </HeaderTopContent>
          <HeaderTopContent>
            <p>Positives</p>
            <b>0</b>
          </HeaderTopContent>
          <HeaderTopContent>
            <p>Neutrals</p>
            <b>0</b>
          </HeaderTopContent>
          <HeaderTopContent>
            <p>Negatives</p>
            <b>0</b>
          </HeaderTopContent>
        </HeaderTopSection>
        <HeaderBottomSection>
          <HStack spacing={4}>
            <Box
              backgroundColor={
                userProfile?.preference?.shipment_in_person
                  ? "green.500"
                  : "red.500"
              }
              color={useColorModeValue("white", "gray.800")}
              p={2}
              borderRadius="md"
            >
              <HStack>
                {userProfile?.preference?.shipment_in_person ? (
                  <Check size={12} />
                ) : (
                  <XCircle size={12} />
                )}{" "}
                <Text as="b">In Person</Text>
              </HStack>
            </Box>
            <Box
              backgroundColor={
                userProfile?.preference?.shipment_by_postal
                  ? "green.500"
                  : "red.500"
              }
              color={useColorModeValue("white", "gray.800")}
              p={2}
              borderRadius="md"
            >
              <HStack>
                {userProfile?.preference?.shipment_by_postal ? (
                  <Check size={12} />
                ) : (
                  <XCircle size={12} />
                )}{" "}
                <Text as="b">Postal</Text>
              </HStack>
            </Box>
            <Box
              backgroundColor={
                userProfile?.preference?.shipment_by_courier
                  ? "green.500"
                  : "red.500"
              }
              color={useColorModeValue("white", "gray.800")}
              p={2}
              borderRadius="md"
            >
              <HStack>
                {userProfile?.preference?.shipment_by_courier ? (
                  <Check size={12} />
                ) : (
                  <XCircle size={12} />
                )}{" "}
                <Text as="b">Courier</Text>
              </HStack>
            </Box>
          </HStack>
          <HStack spacing={4}>
            {isUserBeingFollowed ? (
              <Button
                leftIcon={<CellSignalFull size={12} />}
                colorScheme="orange"
                onClick={handleFollowUser}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                leftIcon={<CellSignalFull size={12} />}
                colorScheme="blue"
                onClick={handleFollowUser}
              >
                Follow
              </Button>
            )}

            <Button
              onClick={handleInboxUser}
              leftIcon={<Envelope size={12} />}
              colorScheme="gray"
            >
              Inbox
            </Button>
            <Button
              onClick={handleReportUser}
              leftIcon={<Info size={12} />}
              colorScheme="red"
            >
              Report
            </Button>
            <AuthenticationModal isOpen={isOpen} onClose={onClose} />
            <FollowUserModal
              axios={axios}
              followeeUserName={username}
              token={token}
              isOpen={isFollowModalOpen}
              onClose={closeFollowModal}
              isUserBeingFollowed={isUserBeingFollowed}
              setIsUserBeingFollowed={setIsUserBeingFollowed}
            />
            <ReportUserModal
              isOpen={isReportModalOpen}
              onClose={closeReportModal}
            />
          </HStack>
        </HeaderBottomSection>
      </HeaderContainer>
      <MainContainer>
        <MainSectionContainer>
          <Box>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={`${import.meta.env.VITE_S3_URL}/avatar/${
                userProfile.avatar
              }`}
              alt="avatar"
            />
          </Box>
          <MainContentContainer>
            <h1>
              {userProfile.first_name} {userProfile.last_name}
            </h1>
            <span>{userProfile.address.address}</span>
            <p>
              {userProfile.preference?.status_message
                ? userProfile.preference?.status_message
                : "No status message!"}
            </p>
          </MainContentContainer>
        </MainSectionContainer>
        <MainNavigationContainer>
          <TabsContainer>
            <NavigationTab
              name={`Feedbacks (${userFeedbacks?.length})`}
              onClick={() => setActiveTab("Feedbacks")}
              active={activeTab === "Feedbacks"}
            />
            {token && (
              <NavigationTab
                name="Opportunities"
                onClick={() => setActiveTab("Opportunities")}
                active={activeTab === "Opportunities"}
              />
            )}
            <NavigationTab
              name={`Collections (${userProfile.collections.length})`}
              onClick={() => setActiveTab("Collections")}
              active={activeTab === "Collections"}
            />
            <NavigationTab
              name={`Wishlist (${userWishlists.length})`}
              onClick={() => setActiveTab("Wishlist")}
              active={activeTab === "Wishlist"}
            />
          </TabsContainer>
          {(() => {
            switch (activeTab) {
              case "Feedbacks":
                return <Feedback feedbacks={userFeedbacks} />;
              case "Opportunities":
                return <div>This is the Oportunidades content.</div>;
              case "Collections":
                return <Collections games={userProfile.collections} />;
              case "Wishlist":
                return <Wishlist wishlists={userWishlists} />;
              default:
                return null;
            }
          })()}
        </MainNavigationContainer>
      </MainContainer>
    </Container>
  );
}

interface NavigationTabProps {
  name: string;
  onClick: () => void;
  active: boolean;
  quantity?: number;
}

const NavigationTab: React.FC<NavigationTabProps> = ({
  name,
  quantity,
  onClick,
  active,
}) => (
  <NavigationTabContainer isActive={active} onClick={onClick}>
    {name}
    {quantity && <span> ({quantity})</span>}
  </NavigationTabContainer>
);
