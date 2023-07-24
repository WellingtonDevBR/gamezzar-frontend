import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 800px;
  height: 100%;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

  h1 {
    margin-bottom: 45px;
  }
`;

export const TabListContainer = styled.div``;

export const TabListHeaderContainer = styled.header`
  display: flex;
`;

export const TabListMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  img {
    width: 350px;
    height: 350px;
  }
`;

interface TabListSectionProps {
  isActive: boolean;
}

export const TabListSection = styled.section<TabListSectionProps>`
  display: flex;
  width: 150px;
  height: 35px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isActive ? "#025b87" : "#c6c6c6")};

  &:hover {
    cursor: pointer;
    background-color: #025b87;
  }
`;
