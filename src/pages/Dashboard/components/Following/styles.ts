import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 800px;
  height: 100%;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

  h1 {
    margin-bottom: 45px;
  }
`;

export const MainProfileContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CardProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const CardProfileSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-right: 20px;

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-left: 10px;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
`;


export const UnfollowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: #f00;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #c00;
  }
`;