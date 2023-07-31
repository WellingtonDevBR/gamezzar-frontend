import { CellSignalFull, Check, Envelope, Info } from "phosphor-react";
import React, { useState, ReactNode, useEffect } from "react";

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

interface UserProps {
  first_name: string;
  user_name: string;
  created_at: string;
  avatar: string;
}

export function Profile() {
  const [activeTab, setActiveTab] = useState("Feedbacks");
  const [user, setUser] = useState<UserProps>({
    user_name: "",
    created_at: "",
    first_name: "",
    avatar: "",
  });
  const { username } = useParams();

  const formattedDate = convertTimeFormat(user.created_at);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
        const result = await axios.get(`/api/user/${username}`);
        setUser(result.data);
        console.log(result.data)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

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
            <SpanOptionsBox>
              <Check size={12} />
              Hand
            </SpanOptionsBox>
            <SpanOptionsBox>
              <Check size={12} />
              Mail
            </SpanOptionsBox>
            <SpanOptionsBox>
              <Check size={12} />
              Portador
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
              src={`${import.meta.env.VITE_S3_URL}/avatar/${user.avatar}`}
              alt="avatar"
            />
          </MainImageContainer>
          <MainContentContainer>
            <h1>{user.first_name}</h1>
            <span>Croydon Park / Sydney</span>
            <p>
              CHANGE - NOW IT'S MANDATORY TO PAY TO ADD GAMES TO THE LIST !!
              HONESTLY, THAT'S JUST NOT RIGHT. I HAVE MANY MORE GAMES, BUT I
              WON'T PAY FOR SOMETHING THAT DOESN'T GIVE ME 100% RETURN OR
              SALES!! UNFORTUNATELY, I'LL ONLY KEEP THE ONES ALREADY LISTED AND
              SLOWLY ABANDON THE WEBSITE...
            </p>
          </MainContentContainer>
        </MainSectionContainer>
        <MainNavigationContainer>
          <TabsContainer>
            <NavigationTab
              name="Feedbacks"
              onClick={() => setActiveTab("Feedbacks")}
              active={activeTab === "Feedbacks"}
            />
            <NavigationTab
              name="Opportunities"
              onClick={() => setActiveTab("Opportunities")}
              active={activeTab === "Opportunities"}
            />
            <NavigationTab
              name="Collections"
              onClick={() => setActiveTab("Collections")}
              active={activeTab === "Collections"}
            />
            <NavigationTab
              name="Wishlist"
              onClick={() => setActiveTab("Wishlist")}
              active={activeTab === "Wishlist"}
            />
          </TabsContainer>
          {(() => {
            switch (activeTab) {
              case "Feedbacks":
                return <Feedback />;
              case "Opportunities":
                return <div>This is the Oportunidades content.</div>;
              case "Collections":
                return <div>This is the Coleção content.</div>;
              case "Wishlist":
                return <div>This is the Desejos content.</div>;
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
}

const NavigationTab: React.FC<NavigationTabProps> = ({
  name,
  onClick,
  active,
}) => (
  <NavigationTabContainer isActive={active} onClick={onClick}>
    {name}
  </NavigationTabContainer>
);
