
import {
  HeaderContainer,
  HeadImage,
  HeaderTop,
  TraderProfileDetails,
  TraderProfileName,
  TraderProfileDescription,
  TradeButton,
  SocialMediaContainer,
  SocialMediaButton,
  HeaderFooter,
  NavigationBar,
  NavItem,
  FollowButton,
  HeaderTitle,
} from "./styles";
import {
  ChatText,
  CopySimple,
  FacebookLogo,
  GoogleLogo,
  TwitterLogo,
} from "phosphor-react";

interface HeaderProps {
  src: string;
  alt: string;
  title: string;
  owner: string;
  avatar: string;
  onTradeClick: () => void;
  token: string;
}


export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <HeaderContainer>
      <HeaderTop>
        <HeadImage src={props.src} alt={props.alt} />

        <TraderProfileDetails>
          <HeaderTitle>{props.title}</HeaderTitle>
          <TraderProfileName>{props.owner}</TraderProfileName>
          <TraderProfileDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
            obcaecati dignissimos quae quo ad iste ipsum officiis deleniti
            asperiores sit.
          </TraderProfileDescription>
          <TradeButton onClick={props.onTradeClick}>
            DdzFFzCqRhshMsx <CopySimple size={20} weight="fill" />
          </TradeButton>
        </TraderProfileDetails>

        <SocialMediaContainer>
          <SocialMediaButton>
            <FacebookLogo size={20} weight="bold" />
          </SocialMediaButton>
          <SocialMediaButton>
            <TwitterLogo size={20} weight="bold" />
          </SocialMediaButton>
          <SocialMediaButton>
            <GoogleLogo size={20} weight="bold" />
          </SocialMediaButton>
          <SocialMediaButton>
            <ChatText size={20} weight="bold" />
          </SocialMediaButton>
          <FollowButton>Follow</FollowButton>
        </SocialMediaContainer>
      </HeaderTop>
      <HeaderFooter>
        <NavigationBar>
          <NavItem className ="nav-link">All</NavItem>
          <NavItem className ="nav-link">Art</NavItem>
          <NavItem className ="nav-link">Music</NavItem>
          <NavItem className ="nav-link">Collectibles</NavItem>
        </NavigationBar>
      </HeaderFooter>
    </HeaderContainer>
  );
};

export default Header;
