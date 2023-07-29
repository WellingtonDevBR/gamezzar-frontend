import styled from "styled-components";

export const MessageBoxContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(
    24deg,
    rgba(12, 7, 27, 1) 0%,
    rgba(21, 6, 69, 1) 19%,
    rgba(3, 1, 9, 1) 54%,
    rgba(6, 3, 47, 1) 100%
  );
  border-radius: 8px;
  padding: 20px;
  width: 600px;
  z-index: 1000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  color: white;
`;

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Textarea = styled.textarea`
  background: transparent;
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 10px;
  color: #fff;
  font-size: 16px;
  resize: none;
  margin-bottom: 10px;
  height: 200px;
  outline: none;
  &::placeholder {
    color: #fff;
  }
`;

export const UserDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: space-between;
  gap: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export const SendMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  float: right;
  button {
    background: transparent;
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 10px 40px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: #fff;
      color: #000;
    }
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;