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
`;

export const Title = styled.h1`
  font-family: 'Urbanist', Sans-serif;
  font-weight: 600;
  font-size: 2rem;
  margin: 0;
  text-align: center;
`;

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
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center; 
  align-items: flex-start;
  flex-wrap: wrap;
  margin-left: 60px; 
 overflow: hidden;
  gap: 60px;
  margin-bottom:60px;
`;

export const LeftContainer = styled.div`
  width: 40%;
  flex: 1;
  flex-direction: column;
  justify-content: left;
  flex-shrink: 0;
  
`;

export const RightContainer = styled.div`
  width: 50%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 10px; 
  flex-shrink: 0;
`;

export const BoxContainer = styled.div`
  display: flex;
  margin-top: 30px;
  background-color: #343444;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  border-radius: 10px;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0; 
`;

export const SearchInput = styled.input`
  padding: 5px 10px;
  border: 1px solid #343444;
  color: white;
  border-radius: 2px;
  background: #14141F;
  width: 250px;
  align-self: flex-start;
  
`;

export const SearchIconBox = styled.div`
  background: #5142FC;
  border: 2px solid #5142FC;
  display: flex;
  justify-content: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 3px;
  cursor: pointer;
`;


export const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 1rem;
`;

export const ContentContainer = styled.div`
  flex-grow: 1;

  h1 {
    font-family: 'Urbanist', Sans-serif;
    font-weight: 600;
    font-size: 16px;
    padding: 1rem 0;
  }

  span {
    font-size: 14px;
    font-weight: 400;
    color: #fff;
  }
`;

export const SubNames = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

export const FilterBoxContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const FilterItem = styled.div`
  background-color: #343444;
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 30px;
  align-items: center;
  font-size: 12px;
  color: #fff;
`;