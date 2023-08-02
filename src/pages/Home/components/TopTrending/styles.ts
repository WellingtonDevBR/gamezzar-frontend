// styles.ts

import styled from "styled-components";

const PRIMARY_COLOR = "#5142fc";
const FONT_SIZE = "0.875rem";

export const CarouselList = styled.div`
  display: flex;
  width: 1000px;
  gap: 1rem;
  margin: 0 auto;
`;

// Styles for the individual Trending Card
export const TopTrendingCard = styled.div`
  width: 185px;
  display: flex;
  flex-direction: row;
  color: white;
  margin-top: 1rem;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  p {
    display: flex;
    align-items: center;
    font-size: 0.675rem;
    font-weight: 700;
    div {
      display: inline-block;
      min-width: 40px;
      height: 12px;
      margin-left: 0.5rem;
      text-align: center;
      border-radius: 10px;
      background: #5142fc;
      margin-top: 0.5rem;
      font-size: 0.612rem;
      padding: 10rem;
    }
  }
`;

// Styles for the Trending Card's image
export const TopTrendingCardImage = styled.div`
  width: 100%;
  height: 185px;
  border-radius: 10px; /* Add border-radius to create rounded corners */
  overflow: hidden; /* Ensure the border-radius works properly */

  img {
    width: 100%;
    height: 100%;
    object-fit: fill; /* Resize the image to cover the container */
    object-position: center; /* Center the image within the container */
  }
`;

// Styles for the Trending Card's footer
export const TopTrendingCardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  color: white;
  gap: 0.5rem;
  margin-top: 0.5rem;
  span {
    font-size: 0.875rem;
    color: #8a8aa0;
  }
  p {
    font-size: 0.5rem;
    color: #e250e5;
    font-weight: 700;
    margin-bottom: 200px;
  }
  img {
    width: 2rem;
  }
`;

// Styles for the Trending Card's content
export const TopTrendingCardContent = styled.div`
  background-color: #1c1c2b;
  padding: 1.1rem;
  width: 185px;
  height: 240px;
  border-radius: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
  }
`;

export const TopTrendingCardPhoto = styled.div`
  margin-top: 0.6rem;
  font-size: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.765rem;
    width: 40px;
  }
`;

// Styles for Carousel Container
export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Styles for Carousel Navigation Buttons
export const NavigationButton = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  &:disabled {
    color: #8a8aa0; // Change this color as per your theme
  }
`;

// Styles for Carousel Navigation
export const Navigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-left: 15rem;
`;

// Styles for Ellipsis
export const Ellipsis = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

interface DotProps {
  active?: boolean;
}

// Styles for Circle with Dot in the middle
export const CircleDot = styled.span<DotProps>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border: 1px solid white;
  border-radius: 50%;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    top: 50%;
    left: 50%;
    background-color: ${({ active }: any) =>
      active ? "white" : "transparent"};
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const CardType = styled.span`
  font-size: ${FONT_SIZE};
  font-weight: 700;
  background-color: ${PRIMARY_COLOR};
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  text-align: center;
`;
