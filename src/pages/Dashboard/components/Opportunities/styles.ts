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

  div {
    h1 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 45px;
    }
  }
`;

export const InputListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  gap: 20px;
`;

export const HeaderSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2px;
  select {
    width: 100%;
    height: 25px;
    border: 1px solid #fff;
    /* padding: 0 100px; */
    color: #495057;
  }
`;

export const InputBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7px;

  div {
    display: flex;
    gap: 10px;
    align-items: center;

    span {
      font-size: 14px;
    }
  }
`;

export const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
`;

export const TradedGamesContainer = styled.div`
  display: flex;
  gap: 20px;

  img {
    max-width: 100px;
    max-height: 125px;
    object-fit: cover;
  }
`;

export const TradesImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;

  img {
    border-radius: 5px;
  }
`;

export const TradesProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 25px;
  width: 100%;
  height: 100%;

  img {
    border-radius: 5px;
    width: 50px;
    height: 50px;
  }

  div {
    display: flex;
    gap: 10px;
    div {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
`;

interface SpanOptionContainerProps {
  backgroundColor: string;
}

export const SpanOptionContainer = styled.span<SpanOptionContainerProps>`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: ${(props) => props.backgroundColor};
  padding: 5px;
  cursor: pointer;
  transition: 0.2s;
  border-radius: 5px;

  &:hover {
    color: #fff;
    filter: brightness(85%);
  }
`;
