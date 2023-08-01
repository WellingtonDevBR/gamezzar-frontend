import styled from "styled-components";

export const PageNav = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #343444;
color: #fff;
padding: 2.5rem;
box-sizing: border-box;
`
export const Title = styled.h1`
font-family: 'Urbanist', Sans-serif;
font-weight: 600;
font-size: 2rem;
  margin: 0;
  text-align: center;
`
export const SubTitle = styled.h3`
font-size: 1rem;
font-family: 'Urbanist', Sans-serif;
font-weight: 400;
  margin: 4px;
  text-align: center;
  white-space: pre-wrap;
  word-break: break-word;
  `;

export const Container = styled.div`
display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px; 
  margin: 0 auto;
  padding-left: 20px;

`;

export const SelectHolder = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  margin: 30px 0px;
`;

export const SelectBtn = styled.select`
  padding: 14px 15px;
  margin: 0px 10px;
  background-color: rgba(52, 52, 68, 1);
  border: none;
  color: white;
  border-radius: 5px;
`;

export const CardHolder = styled.div`
   display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px;
  margin-top: 20px;
  gap: 30px;
`;

export const CardContainer = styled.div`
  width: 250px;
  height: 380px;
  background-color: rgb(53, 53, 71);
  border-radius: 10px;
  padding: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export const CardImage = styled.div`
  width: 100%;
  padding: 10px;
  height: 55%;
  border-radius: 10px;
  background-color: rgb(123, 121, 136);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ComingSoon = styled.div`
  width: 120px;
  padding: 5px;
  border-radius: 30px;
  background-color: orange;
  text-align: center;
  font-weight: 600;
  color: black;
`;

export const Favourite = styled.div`
  background-color: black;
  color: rgb(210, 210, 210);
  width: 70px;
  border-radius: 10px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const TitleCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const TitleText = styled.span`
  width: 80%;
  font-size: 1.1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const TitleLabel = styled.label`
 background-color: #5142fc;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;

export const ProfileHolder = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;

export const ProfileImage = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 15px;
  background-color: rgb(123, 121, 136);
`;

export const ProfileTextHolder = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileLabel = styled.label`
  color: rgb(175, 175, 175);
`;

export const BtnHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const TradeBtn = styled.button`
  background-color: transparent;
  color: rgba(255, 255, 255, 0.679);
  border: solid 3px rgb(80, 71, 133);
  border-radius: 40px;
  width: 120px;
  font-weight: 600;
  height: 40px;
  transition: 0.2s;

  &:hover {
    background-color: rgb(80, 71, 133);
    color: white;
  }
`;

export const HistoryBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #b6b6b6;
  border: solid 2px transparent;
  padding: 0px 10px;
  font-weight: bold;
  height: 40px;
  border-radius: 40px;
  transition: 0.2s;

  &:hover {
    border: solid 2px #b6b6b6;
  }
`;

 export const LoadMoreButton = styled.button`
   margin: 20px auto; 
  padding: 12px 24px;
  background-color: transparent;
  color: white;
  border: 1px solid #b6b6b6;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #343434;
    color: white;
  }
`;