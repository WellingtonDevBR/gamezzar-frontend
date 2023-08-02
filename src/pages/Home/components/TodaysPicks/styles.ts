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

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #343444;
  border-radius: 1rem;
  width: 235px;

  img {
    width: 100%;
    height: 220px;
    object-fit: cover; /* Ensure the image fills the container while maintaining aspect ratio */
    border-radius: 0.5rem;
  }
`;

export const CardSection = styled.section`
  div:nth-child(1) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 0.875rem;
      display: inline-block;
      width: 100%; // Set width
      overflow: hidden; // Set overflow
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    span {
      font-size: 0.875rem;
      font-weight: 700;
      width: 50px;
      text-align: center;
      background-color: ${(props) => props.theme["--primary"]};
      border-radius: 0.5rem;
    }
  }
`;

export const CardFooterContent = styled.div`
  div:nth-child(1) {
    display: flex;
    gap: 1rem;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    margin-top: 1rem;

    button:nth-child(1) {
      width: 100%;
      height: 40px;
      font-size: 0.875rem;
      border-radius: 8px;
      border: 1px solid var(--primary, #5142fc);
      background-color: transparent;
      color: white;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        background-color: var(--primary, #5142fc);
        color: white;
      }
    }

    button:nth-child(2) {
      width: 80%;
      height: 46px;
      background-color: transparent;
      color: var(--white-2, #8a8aa0);
      font-weight: 700;
      font-size: 0.65rem;
      cursor: pointer;
    }
  }

  img {
    margin-top: 1rem;
    width: 44px;
    height: 44px;
  }
`;

const PRIMARY_COLOR = "#5142fc";

export const CardOwner = styled.div`
  display: flex;
  flex-direction: row;
`;

export const OwnerDetails = styled.div`
  display: flex;
  flex-direction: column !important;
  align-items: flex-start !important;

  h3 {
    font-size: 0.8125rem;
    color: var(--white-2, #8A8AA0);
  }

  h4 {
    font-size: 0.975rem;
    display: inline-block;
    color: var(--white-1, #EBEBEB);
    width: 100%;
  }
`;

export const CardTitle = styled.h2`
  font-size: 0.875rem;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const CardType = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
  background-color: ${PRIMARY_COLOR};
  border-radius: 0.5rem;
`;

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
