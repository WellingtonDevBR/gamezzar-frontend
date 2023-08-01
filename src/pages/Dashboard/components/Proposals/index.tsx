import React, { useEffect, useState } from "react";
import {
  Container,
  TabListContainer,
  TabListHeaderContainer,
  TabListMainContainer,
  TabListSection,
  ProposalCardContainer,
  ProposalCardProfile,
  ProposalCardRightSection,
  ProposalCardButton,
  SendMessageButton,
  CancelButton,
} from "./styles";
import Cookies from "js-cookie";
import { getAxiosInstance } from "../../../../services/axios";
import { MessageBox } from "./components/MessageBox";
import LoadingOverlay from "react-loading-overlay";

export function Proposal() {
  const [activeTab, setActiveTab] = useState("received");
  const [userId, setUserId] = useState("");
  const [proposals, setProposals] = useState<any[]>([]);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");

  // filter proposals received by the current user
  const receivedProposals = proposals.filter(
    (propose) => propose.owner_user_id === userId
  );

  // filter proposals sent by the current user
  const sentProposals = proposals.filter(
    (propose) => propose.interested_user_id === userId
  );

  useEffect(() => {
    setIsLoading(true);
    async function getProposals() {
      const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("/api/propose/all");
      setUserId(response.data.user_id);
      setProposals(response.data.proposals);
      setIsLoading(false);
    }
    getProposals();
  }, []);

  return (
    <LoadingOverlay active={isLoading} spinner text="Loading...">
      <Container>
        <h1>Proposals</h1>
        <TabListContainer>
          <TabListHeaderContainer>
            <TabListSection
              isActive={activeTab === "received"}
              onClick={() => setActiveTab("received")}
            >
              Received <span>({receivedProposals.length})</span>
            </TabListSection>
            <TabListSection
              isActive={activeTab === "sent"}
              onClick={() => setActiveTab("sent")}
            >
              Sent <span>({sentProposals.length})</span>
            </TabListSection>
          </TabListHeaderContainer>
          <TabListMainContainer>
            {(() => {
              switch (activeTab) {
                case "received":
                  return receivedProposals.length > 0 ? (
                    receivedProposals.map((propose) => (
                      <ProposalCardContainer key={propose.propose_id}>
                        <img
                          src={`${import.meta.env.VITE_S3_URL}/games/${
                            propose.receiver_game.image
                          }`}
                          alt={propose.receiver_game.title}
                        />
                        <img
                          src={`${import.meta.env.VITE_S3_URL}/games/${
                            propose.sender_game.image
                          }`}
                          alt="Project Image"
                        />
                        <ProposalCardRightSection>
                          <ProposalCardProfile>
                            <img
                              src={`${import.meta.env.VITE_S3_URL}/avatar/${
                                propose.sender.avatar
                              }`}
                              alt="Project Image"
                            />
                            <div>
                              <h4>
                                {propose.sender.first_name}{" "}
                                {propose.sender.last_name}
                              </h4>
                              <p>Game Description</p>
                            </div>
                          </ProposalCardProfile>
                          <ProposalCardButton>
                            <SendMessageButton
                              type="button"
                              onClick={() => setIsMessageBoxOpen(true)}
                            >
                              Enviar Mensagem
                            </SendMessageButton>
                            {isMessageBoxOpen && (
                              <MessageBox
                                onClose={() => setIsMessageBoxOpen(false)}
                                proposal={propose}
                                isSender={true}
                              />
                            )}
                            <CancelButton type="button">Cancelar</CancelButton>
                          </ProposalCardButton>
                        </ProposalCardRightSection>
                      </ProposalCardContainer>
                    ))
                  ) : (
                    <>
                      <img
                        src="https://cdn.trocajogo.net/static/undraw/undraw_accept_request_vdsd.svg"
                        alt="Project Image"
                      />
                      <h4>No received proposals</h4>
                      <p>
                        To receive more proposals, try increasing the interest
                        level of games in your collection.
                      </p>
                    </>
                  );
                case "sent":
                  return sentProposals.length > 0 ? (
                    sentProposals.map((propose) => (
                      <ProposalCardContainer key={propose.propose_id}>
                        <img
                          src={`${import.meta.env.VITE_S3_URL}/games/${
                            propose.sender_game.image
                          }`}
                          alt="Project Image"
                        />
                        <img
                          src={`${import.meta.env.VITE_S3_URL}/games/${
                            propose.receiver_game.image
                          }`}
                          alt="Project Image"
                        />
                        <ProposalCardRightSection>
                          <ProposalCardProfile>
                            <img
                              src={`${import.meta.env.VITE_S3_URL}/avatar/${
                                propose.receiver.avatar
                              }`}
                              alt="Project Image"
                            />
                            <div>
                              <h4>
                                {propose.receiver.first_name}{" "}
                                {propose.receiver.last_name}
                              </h4>
                              <p>Address</p>
                            </div>
                          </ProposalCardProfile>
                          <ProposalCardButton>
                            <SendMessageButton
                              type="button"
                              onClick={() => setIsMessageBoxOpen(true)}
                            >
                              Send Message
                            </SendMessageButton>
                            {isMessageBoxOpen && (
                              <MessageBox
                                onClose={() => setIsMessageBoxOpen(false)}
                                proposal={propose}
                                isSender={false}
                              />
                            )}
                            <CancelButton type="button">Cancelar</CancelButton>
                          </ProposalCardButton>
                        </ProposalCardRightSection>
                      </ProposalCardContainer>
                    ))
                  ) : (
                    <div>
                      <img
                        src="https://cdn.trocajogo.net/static/undraw/undraw_add_file_4gfw.svg"
                        alt="Project Image"
                      />
                      <h4>No sent proposals</h4>
                      <p>All the proposals you send will appear here...</p>
                    </div>
                  );
                default:
                  return <div>Received</div>;
              }
            })()}
          </TabListMainContainer>
        </TabListContainer>
      </Container>
    </LoadingOverlay>
  );
}
