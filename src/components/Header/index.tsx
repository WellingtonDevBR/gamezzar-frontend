import {
  Container,
  LogoContainer,
  NavigationContainer,
  NavList,
  NavItem,
  ButtonContainer,
  HeaderDivider,
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
          <NavLink to="/login">
            <button>Login / Sign Up</button>
          </NavLink>
        </ButtonContainer>
      </Container>
      <HeaderDivider />
    </>
  );
}
