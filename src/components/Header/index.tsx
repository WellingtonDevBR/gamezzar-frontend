import {
  Container,
  LogoContainer,
  NavigationContainer,
  NavList,
  NavItem,
  ButtonContainer,
  HeaderDivider,
  LinkContainer,
  StyledNavLink,
  SignUpLink,
} from "./styles";
import HeaderLogo from "../../assets/logo.svg";
import { MagnifyingGlass } from "phosphor-react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { title: "Home", path: "#" },
  { title: "Explore", path: "#" },
  { title: "Activity", path: "#" },
  { title: "Community", path: "#" },
  { title: "Contact", path: "#" },
];

export function Header() {
  return (
    <>
      <Container>
        <LogoContainer>
          <NavLink to="/">
            <img src={HeaderLogo} alt="logo" />
          </NavLink>
        </LogoContainer>
        <NavigationContainer>
          <NavList>
            {NAV_ITEMS.map(({ title, path }) => (
              <NavItem key={title}>
                <a href={path}>{title}</a>
              </NavItem>
            ))}
          </NavList>
        </NavigationContainer>
        <ButtonContainer>
          <MagnifyingGlass size={32} color={"white"} />
          <LinkContainer>
            <StyledNavLink to="/login">
              <span>Login</span>
            </StyledNavLink>
            <SignUpLink to="/signup">
              <span>Sign Up</span>
            </SignUpLink>
          </LinkContainer>
        </ButtonContainer>
      </Container>
      <HeaderDivider />
    </>
  );
}
