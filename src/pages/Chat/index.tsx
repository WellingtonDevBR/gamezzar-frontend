import { useState } from "react";
import { getAxiosInstance } from "../../services/axios";
import {
  Container,
  Header,
  Main,
  UsersChattingSection,
  ChattingSection,
  UserInfoContainer,
  MessageContextComponent,
  MessageContentBox,
  NotificationButton,
  SendMessageContainer,
} from "./styles";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function Chat() {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    navigate(0);
  }

  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post("/api/message", {
      message,
    });

    console.log(response.data);
    setMessage("");
  };

  return (
    <Container>
      <Header>
        <p>Want to receive notifications of new messages?</p>
        <NotificationButton>Enable Notifications</NotificationButton>
      </Header>
      <Main>
        <UsersChattingSection>
          <UserInfoContainer>
            <img
              src="https://cdn.trocajogo.net/users/20200501000000_avatar.png"
              alt=""
            />
            <div>
              <h2>User name</h2>
              <p>Last message</p>
            </div>
          </UserInfoContainer>
        </UsersChattingSection>
        <ChattingSection>
          <UserInfoContainer>
            <img
              src="https://cdn.trocajogo.net/users/20200501000000_avatar.png"
              alt=""
            />
            <div>
              <h2>User name</h2>
              <p>Last message</p>
            </div>
          </UserInfoContainer>
          <MessageContextComponent>
            <MessageContentBox isUser={true}>
              <p>
                Hi there, are you trading? Hi there, are you trading? Hi there,
                are you trading? Hi there, are you trading? Hi there, are you
                trading? Hi there, are you trading? Hi there, are you trading?
                Hi there, are you trading? Hi there, are you trading? Hi there,
                are you trading?
              </p>
              <p>12:00</p>
            </MessageContentBox>
            <MessageContentBox isUser={false}>
              <p>Hi there, are you trading?</p>
              <p>12:00</p>
            </MessageContentBox>
          </MessageContextComponent>
          <SendMessageContainer>
            <textarea
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="button" onClick={sendMessage}>
              Send
            </button>
          </SendMessageContainer>
        </ChattingSection>
      </Main>
    </Container>
  );
}
