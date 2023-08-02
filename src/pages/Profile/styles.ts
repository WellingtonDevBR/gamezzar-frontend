import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;  
  min-height: 100vh;  
  justify-content: space-between;
  width: 1000px;
  margin: 0 auto;
`;

export const Footer = styled.footer`
  // your footer styles here
`;


export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
`;

export const HeaderTopSection = styled.section`
  display: flex;
  justify-content: space-between;
  text-align: center;
`;

export const HeaderTopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const HeaderBottomSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

export const SpanOptionsContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

interface SpanOptionsBoxProps {
  isClickable?: boolean;
  backgroundColor?: string;
  hoverColor?: string;
  isActive?: boolean;
}

export const SpanOptionsBox = styled.span<SpanOptionsBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  width: 80px;
  height: 20px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isActive ? props.theme["--done"] : props.theme["--critical"]};

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const ProfileMenuContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const MainContainer = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
`;

export const MainSectionContainer = styled.section`
  display: flex;
  gap: 20px;
`;

export const MainImageContainer = styled.div`
  display: flex;

  img {
    width: 150px;
    height: 80px;
    border-radius: 50%;
  }
`;

export const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h1 {
    font-size: 32px;
  }

  span {
    font-size: 16px;
    color: #c6c6c6;
  }
`;

export const MainNavigationContainer = styled.section``;

interface NavigationTabContainerProps {
  isActive: boolean;
}

export const NavigationTabContainer = styled.button<NavigationTabContainerProps>`
  background-color: ${(props) => (props.isActive ? "#3a31c8" : "#c6c6c6")};
  color: #fff;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#3a31c8" : "#807e7e")};
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;
