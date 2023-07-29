import styled from "styled-components";

export const Container = styled.div`
  width: 600px;
  height: 500px; 
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
  border: 2px solid #dedede;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px;
  background-color: black;
  border-radius: 10px;

  @media (max-width: 768px) {
    max-width: 100%;
    height: 100vh;
    border: none;
    border-radius: 0;
  }

  .message {
    display: flex;
    flex-direction: column;

    margin-bottom: 15px;
  }

  .message-detail {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .message-details > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-message {
    align-self: flex-start;
    background-color: #51344a;
    border-radius: 5px;
    padding: 15px 10px;
    margin-bottom: 10px;
  }

  .second-user-message {
    align-self: flex-end;
    background-color: rgba(81, 66, 252, 1);
    border-radius: 5px;
    padding: 15px 10px;
    margin-bottom: 10px;
  }

  .user-image,
  .user-name-time {
    display: inline-block;
  }

  .user-name-time {
    flex: 1; 
    text-align: right;
  }
  .user-image {
    width: 30px; 
    height: 30px; 
    border-radius: 50%;
    margin-right: 10px;
  }

  h3 {
    color: #ffff;
    background-color: trasnparent;
    font-size: 18px;
    font-weight: 600;
    border-radius: 4px;
  }

  h2 {
    font-size: 12px;
    margin-bottom: 5px;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
  }
`;

export const IconBtn = styled.button`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  flex: 1;
  background-color: black;
  color: #ffff;
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

export const OnlineUsersList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  flex: 1;
  margin: 10px 0;

  div {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 10%;
    margin-right: 10px;
  }

  h2 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const SendMsgBtn = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 8px;

  input[type="text"] {
    flex: 1;
    margin-right: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  button {
    padding: 8px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
`;
