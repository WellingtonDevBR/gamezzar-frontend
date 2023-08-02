import styled from "styled-components";

export const Container = styled.div`
  width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 6rem;

  h1 {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

export const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0fr); // 4 columns
  grid-gap: 1rem;
  margin-top: 2rem;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const PRIMARY_COLOR = "#5142fc";

export const ShowMoreButton = styled.button`
  margin: 0 auto;
  width: 154px;
  height: 54px;
  font-size: 0.875rem;
  border-radius: 30px;
  border: 1px solid var(--on-surface, #fff);
  cursor: pointer;
  background-color: transparent;
  color: white;
  font-size: 15px;
  font-family: Urbanist, sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;

  &:hover {
    background-color: ${PRIMARY_COLOR};
  }
`;

export const CardType = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
  background-color: ${PRIMARY_COLOR};
  border-radius: 0.5rem;
`;
