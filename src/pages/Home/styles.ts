import styled from "styled-components";

export const Container = styled.div`
  width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 6rem 8rem 3rem 0;
  justify-content: center;
  margin: 0 auto;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
