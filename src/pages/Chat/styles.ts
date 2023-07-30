import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  margin: 50px auto;
  background: linear-gradient(
    24deg,
    rgba(12, 7, 27, 1) 0%,
    rgba(21, 6, 69, 1) 100%,
    rgba(3, 1, 9, 1) 54%,
    rgba(6, 3, 47, 1) 100%
  );
  gap: 1.5rem;
  margin-top: 3.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  align-items: center;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const ChattingSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  min-height: 600px;
  border: 1px solid #5142fc;
  padding: 1.5em;
`;

export const UsersChattingSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 10px;
  border: 1px solid #5142fc;
  padding: 0.9em;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  h2 {
    font-size: 16px;
  }

  p {
    font-size: 12px;
  }
`;

interface MessageContextComponent {
  isuser: boolean;
}

export const MessageContextComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  gap: 20px;
  align-items: flex-start;
  overflow-y: auto; // this line enables scrolling
`;


export const MessageContentBox = styled.div<MessageContextComponent>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: ${(props) => (props.isuser ? "#4290fc" : "#968dfd")};
  text-align: ${(props) => (props.isuser ? "right" : "left")};
  align-self: ${(props) => (props.isuser ? "flex-end" : "flex-start")};
  max-width: 550px;
  height: auto;
  border-radius: 15px;
  padding: 10px;
  margin: 10px;
  line-height: 25px;

  span {
    font-size: 12px;
    color: #fff;
    margin-top: 10px;
  }
`;

export const NotificationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
  background: #3cb371;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #2e8b57;
  }
`;

export const SendMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  gap: 10px;

  textarea {
    width: 100%;
    height: 70px;
    border-radius: 5px;
    border: 1px solid #5142fc;
    padding: 10px;
    resize: none;
    outline: none;
    color: #fff;
    background: transparent;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100%;
    background: #3cb371;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: #2e8b57;
    }
  }
`;
