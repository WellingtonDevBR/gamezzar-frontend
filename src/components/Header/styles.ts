import styled from "styled-components";

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
    content: " ▼";
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

  button {
    border: 1px solid ${(props) => props.theme["--primary"]};
    border-radius: 1rem;
    height: 3rem;
    min-width: 12.375rem;
    background-color: transparent;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;

    @media (min-width: ${Breakpoints.mobile}) {
      font-size: 1.1rem;
    }

    ${(props) => props.theme["--surface"]}
  }
`;

export const HeaderDivider = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: #7a798a;
`;
