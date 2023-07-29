import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const PopularCollectionsList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

export const PopularCollectionsCard = styled.div`
  padding: 1rem;
  background-color: #343444;
  min-width: 475px;
  max-height: 394px;
  border-radius: 20px;
  margin-top: 1rem;
`;

export const PopularCollectionsHeader = styled.header`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  img {
    width: 64px;
    height: 64px;
    border-radius: 20px;
  }
`;

export const PopularCollectionsContent = styled.section`
  display: flex;
  align-items: start;
  margin-top: 1rem;
  justify-content: space-between;
`;

export const Main = styled.main`
  width: 220px;
  height: 272px;
  img {
    width: 180px;
    height: 100%;
    object-fit: cover;
    background: var(--secondary-white, #7a798a);
    border-radius: 20px;
  }
`;

export const SmallImages = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  img {
    height: 105px;
    width: 48%;
    object-fit: cover;
    background: var(--secondary-white, #7a798a);
    border-radius: 20px;
  }
`;

export const LargeImage = styled.div`
  margin-left: 1rem;
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    background: var(--secondary-white, #7a798a);
    border-radius: 20px;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  align-items: stretch;
`;
