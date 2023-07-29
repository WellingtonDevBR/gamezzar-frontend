import React, { useState } from "react";
import {
  MessageBoxContainer,
  CloseButton,
  MainContainer,
  Textarea,
  UserDetailsContainer,
  SendMessageContainer,
  Backdrop,
} from "./styles";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getAxiosInstance } from "../../../../../../services/axios";

interface MessageBoxProps {
  onClose: () => void;
  proposal: any;
  isReceiver: boolean;
}

export function MessageBox({ onClose, proposal, isReceiver }: MessageBoxProps) {
  const token = Cookies.get("token");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
  }
  const handleContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleSendMessage = async () => {
    const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post("/api/message/", {
      ...proposal,
      message,
    });
    onClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <Backdrop onClick={onClose} />
      <MessageBoxContainer>
        <header>
          <h1>New message</h1>
        </header>
        <MainContainer>
          <p>Enter Your Message Below</p>
          <Textarea
            placeholder="Type your message here..."
            onChange={handleInputChange}
            value={message}
          />
          <UserDetailsContainer>
            <b>To: </b>
            <img
              src={`${import.meta.env.VITE_S3_URL}/avatar/${
                proposal.receiver.avatar
              }`}
              alt=""
            />{" "}
            <p>
              {isReceiver
                ? `${proposal.sender.first_name} ${proposal.sender.last_name}`
                : `${proposal.receiver.first_name} ${proposal.receiver.last_name}`}
            </p>
          </UserDetailsContainer>
        </MainContainer>
        <SendMessageContainer>
          <button onClick={handleSendMessage}>Send</button>
        </SendMessageContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
      </MessageBoxContainer>
    </>
  );
}
