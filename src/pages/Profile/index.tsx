import { CellSignalFull, Check, Envelope, Info, XCircle } from "phosphor-react";
import React, { useState, ReactNode, useEffect } from "react";
import { Collections } from "./components/Collections";
import { Spinner, Center } from "@chakra-ui/react";

import {
  Container,
  HeaderContainer,
  HeaderTopSection,
  HeaderBottomSection,
  SpanOptionsBox,
  SpanOptionsContainer,
  ProfileMenuContainer,
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
  const token = Cookies.get("token");
  const { username } = useParams();
  const formattedDate = convertTimeFormat(userProfile.created_at);
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);

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
    fetchUserFeedback();
    fetchUser();
    fetchUserWishlist();
  }, []);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
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
          <SpanOptionsContainer>
            <SpanOptionsBox
              isActive={userProfile?.preference?.shipment_in_person}
            >
              {userProfile?.preference?.shipment_in_person ? (
                <Check size={12} />
              ) : (
                <XCircle size={12} />
              )}{" "}
              In Person
            </SpanOptionsBox>
            <SpanOptionsBox
              isActive={userProfile?.preference?.shipment_by_postal}
            >
              {userProfile?.preference?.shipment_by_postal ? (
                <Check size={12} />
              ) : (
                <XCircle size={12} />
              )}
              Postal
            </SpanOptionsBox>
            <SpanOptionsBox
              isActive={userProfile?.preference?.shipment_by_courier}
            >
              {userProfile?.preference?.shipment_by_courier ? (
                <Check size={12} />
              ) : (
                <XCircle size={12} />
              )}
              Courier
            </SpanOptionsBox>
          </SpanOptionsContainer>
          <ProfileMenuContainer>
            <SpanOptionsBox backgroundColor="#21d873" hoverColor="#0c6e38">
              <CellSignalFull size={12} />
              Follow
            </SpanOptionsBox>
            <SpanOptionsBox backgroundColor="#c6c6c6" hoverColor="#807e7e">
              <Envelope size={12} />
              Inbox
            </SpanOptionsBox>
            <SpanOptionsBox backgroundColor="#b81515" hoverColor="#700b0b">
              <Info size={12} />
              Report
            </SpanOptionsBox>
          </ProfileMenuContainer>
        </HeaderBottomSection>
      </HeaderContainer>
      <MainContainer>
        <MainSectionContainer>
          <MainImageContainer>
            <img
              src={`${import.meta.env.VITE_S3_URL}/avatar/${
                userProfile.avatar
              }`}
              alt="avatar"
            />
          </MainImageContainer>
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
