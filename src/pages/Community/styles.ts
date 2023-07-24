import styled from "styled-components";

interface CardOptionProps {
  backgroundColor: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  width: 1000px;

  h1 {
    margin-bottom: 16px;
  }

  main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 3rem;
  }
`;

export const CardOption = styled.section<CardOptionProps>`
  display: flex;
  flex-direction: column;
  width: 210px;
  gap: 1rem;
  flex-shrink: 0;
  cursor: pointer;

  div {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background-color: ${(props) => props.backgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
