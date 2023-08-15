import styled from "styled-components";

export const Container = styled.div`
  width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 50px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
