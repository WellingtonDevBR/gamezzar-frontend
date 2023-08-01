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
  Dropdown,
  DropdownMenu,
} from "./styles";
import HeaderLogo from "../../assets/logo.svg";
import { MagnifyingGlass } from "phosphor-react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { getAxiosInstance } from "../../services/axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { title: "Home", path: "/" },
  { title: "Explore", path: "/explorer" },
  { title: "Activity", path: "/activity" },
  { title: "Community", path: "#" },
  { title: "Contact", path: "/contact" },
];

interface UserResponseProps {
  user_id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  avatar: string;
  email: string;
  created_at: string;
}

export function Header() {
  let token = Cookies.get("token");
  const [user, setUser] = useState<UserResponseProps | null>(null);
  useEffect(() => {
    async function fetchData() {
      if (token) {
        const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get("/api/user/details");
        setUser(response.data);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Container>
        <LogoContainer>
          <NavLink to="/" reloadDocument>
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
          {user !== null ? (
            <Dropdown>
              <StyledNavLink to="/dashboard" is_logged_in={token}>
                <span>Hello, {user.user_name}</span>
              </StyledNavLink>
              <DropdownMenu>
                <NavLink to="/chat">Go to Chat</NavLink>
                <NavLink to="/profile">Go to Profile</NavLink>
                <NavLink to="/settings">Settings</NavLink>
                <NavLink to="/logout">Logout</NavLink>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <LinkContainer>
              <StyledNavLink to="/login">
                <span>Login / </span>
              </StyledNavLink>
              <SignUpLink to="/signup">
                <span>Sign Up</span>
              </SignUpLink>
            </LinkContainer>
          )}
        </ButtonContainer>
      </Container>
      <HeaderDivider />
    </>
  );
}
