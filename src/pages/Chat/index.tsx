import { useEffect, useState } from "react";
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
  const [chat, setChat] = useState<any[]>([]);
  const [textarea, setTextarea] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [user, setUser] = useState<any>();
  const [activeChat, setActiveChat] = useState<boolean>(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  useEffect(() => {
    if (!token) {
      navigate("/login");
      navigate(0);
    }
    async function getChat() {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const chatResponse = await axios.get("/api/chat");
      setChat(chatResponse.data);
    }

    async function getLoginDetails() {
      const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("/api/user/details");
      setUser(response.data);
    }
    getChat();
    getLoginDetails();
  }, []);

  const getChatMessage = async (chatId: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const messageResponse = await axios.get(`/api/message/${chatId}`);
    setMessages(messageResponse.data.items);
    setActiveChat(true);
  };

  const sendMessage = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const messageResponse = await axios.post("/api/message", {
      message: textarea,
    });
    console.log(messageResponse);
  };

  return (
    <Container>
      <Header>
        <p>Want to receive notifications of new messages?</p>
        <NotificationButton>Enable Notifications</NotificationButton>
      </Header>
      <Main>
        <UsersChattingSection>
          {chat.map((conversation) => {
            return (
              <UserInfoContainer
                onClick={() => getChatMessage(conversation.chat_id)}
              >
                <img
                  src={`${import.meta.env.VITE_S3_URL}/avatar/${
                    conversation.user.avatar
                  }`}
                  alt=""
                />
                <div>
                  <h2>
                    {conversation.user.first_name} {conversation.user.last_name}
                  </h2>
                  <p>{conversation.user.last_name}</p>
                </div>
              </UserInfoContainer>
            );
          })}
        </UsersChattingSection>
        <ChattingSection>
          {activeChat && (
            <>
              <UserInfoContainer>
                {chat.map((conversation, index) => {
                  return (
                    <>
                      <img
                        src={`${import.meta.env.VITE_S3_URL}/avatar/${
                          conversation.user.avatar
                        }`}
                        alt=""
                      />
                      <div>
                        <h2>
                          {conversation.user.first_name}{" "}
                          {conversation.user.last_name}
                        </h2>
                        <p>{conversation.user.last_name}</p>
                      </div>
                    </>
                  );
                })}
              </UserInfoContainer>
              <MessageContextComponent>
                {messages.map((message: any) => {
                  return (
                    <MessageContentBox
                      isUser={message.receiver_id === user.user_id}
                    >
                      <p>{message.content}</p>
                      <span>
                        {new Date(message.created_at).toLocaleTimeString()}
                      </span>
                    </MessageContentBox>
                  );
                })}
              </MessageContextComponent>
              <SendMessageContainer>
                <textarea
                  placeholder="Type your message"
                  onChange={(e: any) => setTextarea(e.target.value)}
                />
                <button type="button" onClick={sendMessage}>
                  Send
                </button>
              </SendMessageContainer>
            </>
          )}
        </ChattingSection>
      </Main>
    </Container>
  );
}
