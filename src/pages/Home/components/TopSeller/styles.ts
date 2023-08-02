import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  h1 {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

export const TopSellersCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  margin-top: 1rem;
  line-height: 25px;
  gap: 1.7rem;
  text-align: center;
  max-width: 1000px;
  
`;

export const TopSellerProfile = styled.div`
  width: 100%;
  height: 5.5rem;
  cursor: pointer;
  img {
    max-width: 85px;
    height: 100%;
  }
`;
