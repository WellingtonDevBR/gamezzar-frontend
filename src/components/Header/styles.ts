import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Breakpoints = {
  mobile: "576px",
  tablet: "768px",
};

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;

  @media (min-width: ${Breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media (min-width: ${Breakpoints.tablet}) {
    margin-bottom: 0;
  }

  img {
    height: 3rem;
    width: auto;
    margin-right: 0.5rem;
    object-fit: cover;

    @media (min-width: ${Breakpoints.mobile}) {
      height: 4rem;
    }

    @media (min-width: ${Breakpoints.tablet}) {
      height: 3rem;
    }
  }
`;

export const NavigationContainer = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;

  @media (min-width: ${Breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;

  @media (min-width: ${Breakpoints.tablet}) {
    flex-direction: row;
    margin-bottom: 0;
  }
`;

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    white-space: nowrap;
  }

  &:after {
    /* content: " ▼"; */
    font-size: 0.6rem;
    color: white;
  }

  @media (min-width: ${Breakpoints.tablet}) {
    margin: 0 1rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  gap: 0.5rem;
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme["--primary"]};
  height: 3rem;
  width: 10rem;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  border-radius: 1rem;
`;

interface StyledNavLinkProps {
  is_logged_in?: any;
}

export const StyledNavLink = styled(NavLink)<StyledNavLinkProps>`
  text-decoration: none;
  margin-right: 3px; /* Add desired space (e.g., 10 pixels) before the link */
  color: white;
  background-color: transparent;
  padding: ${(props) => (props.is_logged_in ? "0.6rem 1.45rem" : "0")};
  border: 1px solid
    ${(props) =>
      props.is_logged_in ? props.theme["--primary"] : "transparent"};
  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme["--primary"]};
    filter: brightness(0.7);
  }

  &::after {
    color: white;
    margin-left: 5px; /* Add space between the link text and the forward slash */
  }

  /* Remove the forward slash from the last link */
  &:last-child::after {
    content: none;
  }
`;

export const SignUpLink = styled(StyledNavLink)`
  margin-right: 0; /* Reset the margin to 0 for the "Sign Up" link */

  &:hover {
    text-decoration: none;
    filter: brightness(0.7);
  }
`;

export const HeaderDivider = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: #7a798a;
`;

export const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  background-color: transparent;
  min-width: 157px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 0.7rem;
  border: 1px solid ${(props) => props.theme["--primary"]};

  a {
    color: white;
    text-decoration: none;
    display: block;
    text-align: center;
    padding: 0.5em;
  }

  a:hover {
    background-color: #c6c6c6;
    color: ${(props) => props.theme["--primary"]};
  }
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${DropdownMenu} {
    display: block;
  }
`;
