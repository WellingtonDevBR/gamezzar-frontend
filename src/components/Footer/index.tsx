import {
  Container,
  FooterContent,
  FooterSection,
  SubscribeInput,
  SendButton,
} from "./styles";
import { FooterLogo } from "./components/FooterLogo";
import { FooterLinks } from "./components/FooterLinks";

export function Footer() {
  return (
    <Container>
      <FooterContent>
        <FooterLogo />
        <FooterLinks
          title="My Account"
          links={[
            "Authors",
            "Collection",
            "Author Profile",
            "Create Collection",
          ]}
        />
        <FooterLinks
          title="Resource"
          links={[
            "Authors",
            "Collection",
            "Author Profile",
            "Create Collection",
          ]}
        />
        <FooterLinks
          title="Company"
          links={["About Us", "Contact Us", "Our Blog", "Discover"]}
        />
        <FooterSection>
          <h3>Subscribe Us</h3>
          <div>
            <SubscribeInput type="email" placeholder="Enter your email" />
            <SendButton>Send</SendButton>
          </div>
        </FooterSection>
      </FooterContent>
    </Container>
  );
}
