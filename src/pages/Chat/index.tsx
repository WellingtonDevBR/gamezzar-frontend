import React, { useState } from "react";
import { Container, OnlineUsersList, IconBtn, SendMsgBtn } from "./styles";
import {
  Camera,
  GearSix,
  Image,
  MagnifyingGlass,
  Question,
} from "phosphor-react";
import emilyImage from "./images/Emily.svg";
import aidenImage from "./images/Aiden.svg";
import johnImage from "./images/John.svg"; 
import sophiaImage from "./images/Sophia.svg"; 

interface IconButtonProps {
  onCameraClick: () => void;
  onImageClick: () => void;
  onGearSixClick: () => void;
  onQuestionClick: () => void;
}

class IconButton extends React.Component<IconButtonProps> {
  render() {
    const { onCameraClick, onImageClick, onGearSixClick, onQuestionClick } =
      this.props;
    return (
      <div className="icon-button">
        <div onClick={onCameraClick} style={{ marginRight: "2px" }}>
          <Camera size={20} weight="light" />
        </div>
        <div onClick={onImageClick} style={{ marginRight: "2px" }}>
          <Image size={20} weight="light" />
        </div>
        <div onClick={onGearSixClick} style={{ marginRight: "2px" }}>
          <GearSix size={20} weight="light" />
        </div>
        <div onClick={onQuestionClick} style={{ marginRight: "2px" }}>
          <Question size={20} weight="light" />
        </div>
      </div>
    );
  }
}
export default IconButton;

interface Message {
  sender: string;
  message: string;
  time: string;
  isActive: boolean;
  imageUrl: string;
}

export function Chat() {
  const [activeUser, setActiveUser] = useState("Emily");

  const chatMessages: Message[] = [
    {
      sender: "User",
      message: "Hi Aiden, how are you? How is the project coming along?",
      time: "10:00 AM Today",
      isActive: true,
      imageUrl: "./images/Emily.svg",
    },
    {
      sender: "Second User",
      message: "Hey! I am doing great. The project is coming along nicely!",
      time: "10:05 AM Today",
      isActive: false,
      imageUrl: "./images/Aiden.svg",
    },

    {
      sender: "User",
      message: "That sounds fantastic!",
      time: "10:10 AM Today",
      isActive: true,
      imageUrl: "./images/Emily.svg", 
    },
  ];

  const onlineUsers = [{ name: "Emily", imageUrl: emilyImage }];

  const offlineUsers = [
    { name: "Aiden", imageUrl: aidenImage },
    { name: "Sophia", imageUrl: sophiaImage },
    { name: "John", imageUrl: johnImage },
  ];

  const handleOnlineUserClick = (name: string) => {
    setActiveUser(name);
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <div>
          <div>
            <MagnifyingGlass size={20} weight="light" />
            <input type="text" placeholder="Search users" />
          </div>
        </div>

        <div>
          <OnlineUsersList>
            <h2>Online Users</h2>
            {onlineUsers.map((user, index) => (
              <div key={index} onClick={() => handleOnlineUserClick(user.name)}>
                <img
                  src={user.name === activeUser ? emilyImage : user.imageUrl}
                />
                <span>{user.name}</span>
              </div>
            ))}
          </OnlineUsersList>

          <OnlineUsersList>
            <h2>Offline Users</h2>
            {offlineUsers.map((user, index) => (
              <div key={index} onClick={() => handleOnlineUserClick(user.name)}>
                <img src={user.imageUrl} />
                <span>{user.name}</span>
              </div>
            ))}
          </OnlineUsersList>
        </div>
      </div>

      <div style={{ flex: 3 }}>
        <Container>
          <div>
          <h3>
  <img src={activeUser === "Aiden" ? aidenImage : emilyImage} alt={activeUser} className="user-image" />
  {activeUser} Chatbox
</h3>

            {chatMessages
              .filter((msg) => msg.sender === activeUser)
              .map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.sender === "User"
                      ? "user-message"
                      : "second-user-message"
                  }`}
                ></div>
              ))}
            <div className="icon-button">
              <IconBtn>
                <IconButton
                  onCameraClick={() => console.log("Camera clicked!")}
                  onImageClick={() => console.log("Image clicked!")}
                  onGearSixClick={() => console.log("Gear clicked!")}
                  onQuestionClick={() => console.log("Question clicked!")}
                />
              </IconBtn>
            </div>
          </div>
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === "User" ? "user-message" : "second-user-message"
              }`}
            >
              {msg.sender === "User" && (
                <img src={emilyImage} className="user-image" />
              )}
              {msg.sender !== "User" && (
                <img src={aidenImage} className="user-image" />
              )}
              <div className="message-details">
                <div>
                  <strong>
                    {msg.sender === "User" ? activeUser : "Aiden"}
                  </strong>
                  <span className="message-time">{msg.time}</span>
                </div>
                <div>{msg.message}</div>
              </div>
              {msg.isActive ? (
                <span className="active-status">Active</span>
              ) : (
                <span className="inactive-status">Inactive</span>
              )}
            </div>
          ))}

          <SendMsgBtn>
            <input
              type="text"
              placeholder="Type your message here"
              style={{ flex: 1, marginRight: "10px", padding: "8px" }}
            />
            <button
              style={{
                padding: "8px",
                borderRadius: "5px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </SendMsgBtn>
        </Container>
      </div>
    </div>
  );
}
