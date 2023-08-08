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

import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Flex,
  Heading,
} from "@chakra-ui/react";

export function Chat() {
  // Establishing State Variables
  const [chat, setChat] = useState<any[]>([]);
  const [textarea, setTextarea] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [user, setUser] = useState<any>();
  const [activeChat, setActiveChat] = useState<boolean>(false);
  const token = Cookies.get("token");
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [currentChat, setCurrentChat] = useState<any>();
  const [emptySubmit, setEmptySubmit] = useState<boolean>(false);

  // References
  const messageContainerRef = useRef<null | HTMLDivElement>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const sendButtonEnabled = textarea.trim() !== "";

  // Navigation and axios setup
  const navigate = useNavigate();
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);

  // Managing Socket.io connection
  useEffect(() => {
    // Establishing WebSocket Connection and handling Notifications
    if (currentChat) {
      // Establishing WebSocket Connection and handling Notifications
      socketRef.current = io(import.meta.env.VITE_SOCKET_IO_SERVER, {
        query: {
          chat_id: currentChat.chat_id,
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
  }, [currentChat, notificationEnabled]);

  // Making requests to the backend
  useEffect(() => {
    if (!token) {
      navigate("/login");
      navigate(0);
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    async function fetchData() {
      const chatResponse = await axios.get("/api/chat");
      if (chatResponse.data.length === 0) {
        navigate("/"); // Assuming that "/" is your home page
      } else {
        setChat(chatResponse.data);
      }

      const response = await axios.get("/api/user/details");
      setUser(response.data);
    }
    fetchData();
  }, []);

  const getChatMessage = async (conversation: any) => {
    console.log(conversation);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const messageResponse = await axios.get(
      `/api/message/${conversation.chat_id}`
    );
    const sortedMessages = messageResponse.data.items.sort(
      (a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    setCurrentChat(conversation);
    setMessages(sortedMessages);
    setActiveChat(true);
  };

  const sendMessage = async (conversation: any) => {
    if (!sendButtonEnabled) {
      return;
    }
    if (!textarea.trim()) {
      setEmptySubmit(true);
      return;
    }
    setEmptySubmit(false);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.post("/api/message", {
      bidder: {
        user_id: conversation.user.user_id,
      },
      receiver: {
        user_id: user.user_id,
      },
      receiver_game: {
        game_id: conversation.game_id,
      },
      message: textarea,
      is_sender: true,
      chat_id: chat[0]?.chat_id,
    });
    setTextarea("");

    const socketParams = {
      bidder_id: conversation.user.user_id,
      receiver_id: user.user_id,
      receiver_game_id: conversation.game_id,
      message: textarea,
      is_sender: true,
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
    <>
      <VStack m="25px auto" w={1000} h={150} justify="center" bg="gray">
        <Heading as="h1" size="lg">
          Dashboard
        </Heading>
        <Text>Dashboard / Chat</Text>
      </VStack>
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
                <UserInfoContainer onClick={() => getChatMessage(conversation)}>
                  <img
                    src={
                      user?.user_id
                        ? `${import.meta.env.VITE_S3_URL}/avatar/${
                            conversation?.user?.avatar
                          }`
                        : "https://gamezzar-images.s3.us-east-2.amazonaws.com/avatar/avatar1.svg"
                    }
                    alt="avatar"
                  />
                  <div>
                    <h2>
                      {conversation.user?.first_name}{" "}
                      {conversation.user?.last_name}
                    </h2>
                    <p>{conversation.user?.last_name}</p>
                  </div>
                </UserInfoContainer>
              );
            })}
          </UsersChattingSection>
          <ChattingSection>
            {activeChat && (
              <>
                <UserInfoContainer>
                  <img
                    src={`${import.meta.env.VITE_S3_URL}/avatar/${
                      currentChat?.user?.avatar
                    }`}
                    alt=""
                  />
                  <div>
                    <h2>
                      {currentChat.user?.first_name}{" "}
                      {currentChat.user?.last_name}
                    </h2>
                    <p>{currentChat.user?.last_name}</p>
                  </div>
                </UserInfoContainer>
                <MessageContextComponent
                  id="messageContainer"
                  ref={messageContainerRef}
                >
                  {messages.map((message: any) => {
                    return (
                      <MessageContentBox
                        isuser={message?.sender_id === user.user_id}
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
                  {
                    <>
                      <textarea
                        className={emptySubmit ? "empty" : ""}
                        placeholder="Type your message"
                        value={textarea}
                        onChange={(e: any) => {
                          setTextarea(e.target.value);
                          setEmptySubmit(false);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => sendMessage(currentChat)}
                        style={{
                          backgroundColor: sendButtonEnabled ? "" : "#c6c6c6",
                          cursor: sendButtonEnabled ? "" : "not-allowed",
                        }}
                        disabled={!sendButtonEnabled}
                      >
                        Send
                      </button>
                    </>
                  }
                </SendMessageContainer>
              </>
            )}
          </ChattingSection>
        </Main>
      </Container>
    </>
  );
}
