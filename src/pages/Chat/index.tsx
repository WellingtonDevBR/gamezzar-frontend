import { useEffect, useState, useRef } from "react";
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
import io from "socket.io-client";
import { Socket } from "socket.io-client";
import { smoothScroll } from "../../helper/smoothScroll";

export function Chat() {
  // Establishing State Variables
  const [chat, setChat] = useState<any[]>([]);
  const [textarea, setTextarea] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [user, setUser] = useState<any>();
  const [activeChat, setActiveChat] = useState<boolean>(false);
  const token = Cookies.get("token");
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string>("");

  // References
  const messageContainerRef = useRef<null | HTMLDivElement>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // Navigation and axios setup
  const navigate = useNavigate();
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);

  // Managing Socket.io connection
  useEffect(() => {
    // Establishing WebSocket Connection and handling Notifications
    if (currentChatId) {
      // Establishing WebSocket Connection and handling Notifications
      socketRef.current = io(import.meta.env.VITE_SOCKET_IO_SERVER, {
        query: {
          chat_id: currentChatId,
        },
      });

      // Notification Support and permission checking
      if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        setNotificationEnabled(true);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            setNotificationEnabled(true);
          }
        });
      }

      socketRef.current.on("newMessage", (newMessage) => {
        setMessages((oldMessages) => [...oldMessages, newMessage]);

        if (document.visibilityState === "hidden" && notificationEnabled) {
          new Notification("New message", { body: newMessage.content });
        }
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [currentChatId, notificationEnabled]);

  // Making requests to the backend
  useEffect(() => {
    if (!token) {
      navigate("/login");
      navigate(0);
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    async function fetchData() {
      const chatResponse = await axios.get("/api/chat");
      setChat(chatResponse.data);

      const response = await axios.get("/api/user/details");
      setUser(response.data);
    }
    fetchData();
  }, []);

  const getChatMessage = async (chatId: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const messageResponse = await axios.get(`/api/message/${chatId}`);
    const sortedMessages = messageResponse.data.items.sort(
      (a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    setCurrentChatId(chatId);
    setMessages(sortedMessages);
    setActiveChat(true);
  };

  const sendMessage = async (conversation: any) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.post("/api/message", {
      interested_user_id: conversation.user.user_id,
      owner_user_id: user.user_id,
      owner_game_id: conversation.game_id,
      message: textarea,
      is_sender: true,
      chat_id: chat[0]?.chat_id,
    });
    setTextarea("");

    const socketParams = {
      interested_user_id: conversation.user.user_id,
      owner_user_id: user.user_id,
      owner_game_id: conversation.game_id,
      message: textarea,
      is_sender: true,
      receiver_id: conversation.user.user_id, // Add the receiver's user ID here
    };

    socketRef.current.emit("sendMessage", socketParams);
  };

  const enableNotifications = () => {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification("Notifications enabled!");
        setNotificationEnabled(true);
      }
    });
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      const positionToScrollTo = messageContainerRef.current.scrollHeight;
      smoothScroll(messageContainerRef.current, positionToScrollTo, 800);
    }
  }, [messages]);

  return (
    <Container>
      <Header>
        <p>Want to receive notifications of new messages?</p>
        {!notificationEnabled ? (
          <NotificationButton onClick={() => enableNotifications()}>
            Enable Notifications
          </NotificationButton>
        ) : (
          <NotificationButton disabled style={{ background: "gray" }}>
            Notifications enabled
          </NotificationButton>
        )}
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
              <MessageContextComponent
                id="messageContainer"
                ref={messageContainerRef}
              >
                {messages.map((message: any) => {
                  return (
                    <MessageContentBox
                      isuser={message.sender_id === user.user_id}
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
                {chat.map((conversation, index) => (
                  <>
                    <textarea
                      placeholder="Type your message"
                      value={textarea}
                      onChange={(e: any) => setTextarea(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => sendMessage(conversation)}
                    >
                      Send
                    </button>
                  </>
                ))}
              </SendMessageContainer>
            </>
          )}
        </ChattingSection>
      </Main>
    </Container>
  );
}
