import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
`;

export const LeftSideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  align-items: center;
  gap: 20px;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 10px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
`;

export const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #c6c6c6;
  align-items: center;
  justify-content: center;
`;

export const SpanOptionButton = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme["--primary"]};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid rgba(0,0,0,.125);

  &:hover {
    background-color: #5122fc;
  }
`;

export const RightSideContainer = styled.div`
  display: flex;
`;
