import { FooterCompanyLogo, SocialLink, SocialLinkContainer } from "../styles";
import logo from "../../../assets/logo.svg";
import { LOGO_COLOR, LOGO_SIZE, SOCIAL_LINKS } from "./constants";

export function FooterLogo() {
  return (
    <FooterCompanyLogo>
      <img src={logo} alt="Company logo" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis non,
        fugit totam vel laboriosam vitae.
      </p>
      <SocialLinkContainer>
        {SOCIAL_LINKS.map(({ Component, href }, index) => (
          <SocialLink key={index} href={href}>
            <Component size={LOGO_SIZE} color={LOGO_COLOR} />
          </SocialLink>
        ))}
      </SocialLinkContainer>
    </FooterCompanyLogo>
  );
}
