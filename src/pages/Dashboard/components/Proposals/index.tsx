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
import { CancelBox } from "./components/CancelBox";

export function Proposal({ proposals, userId }) {
  const [activeTab, setActiveTab] = useState("received");
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);
  const [isCancelBoxOpen, setIsCancelBoxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");

  // filter proposals received by the current user
  const sentProposals = proposals.filter(
    (propose) => propose.bidder_id === userId
  );

  // filter proposals sent by the current user
  const receivedProposals = proposals.filter(
    (propose) => propose.receiver_id === userId
  );

  const handleCancelBox = (proposalId) => {
    // Toggle the CancelBox state for the specific proposal
    setIsCancelBoxOpen((prevState: any) => ({
      ...prevState,
      [proposalId]: !prevState[proposalId],
    }));
  };

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
                            propose.bidder_game.image
                          }`}
                          alt={propose.bidder_game.title}
                        />
                        <ProposalCardRightSection>
                          <ProposalCardProfile>
                            <img
                              src={`${import.meta.env.VITE_S3_URL}/avatar/${
                                propose.bidder.avatar
                              }`}
                              alt="Profile Image"
                            />
                            <div>
                              <h4>
                                {propose.bidder.first_name}{" "}
                                {propose.bidder.last_name}
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
                                isOpen={isMessageBoxOpen}
                              />
                            )}
                            <CancelButton
                              type="button"
                              onClick={() =>
                                handleCancelBox(propose.propose_id)
                              }
                            >
                              Cancelar
                            </CancelButton>
                            {isCancelBoxOpen[propose.propose_id] && (
                              <CancelBox
                                isOpen={isCancelBoxOpen[propose.propose_id]}
                                isBidder={false}
                                onClose={() =>
                                  handleCancelBox(propose.propose_id)
                                }
                                proposal={propose}
                              />
                            )}
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
                            propose.bidder_game.image
                          }`}
                          alt={propose.bidder_game.title}
                        />
                        <img
                          src={`${import.meta.env.VITE_S3_URL}/games/${
                            propose.receiver_game.image
                          }`}
                          alt={propose.receiver_game.title}
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
                              Message
                            </SendMessageButton>
                            {isMessageBoxOpen && (
                              <MessageBox
                                onClose={() => setIsMessageBoxOpen(false)}
                                proposal={propose}
                                isSender={false}
                                isOpen={isMessageBoxOpen}
                              />
                            )}
                            <CancelButton
                              type="button"
                              onClick={() =>
                                handleCancelBox(propose.propose_id)
                              }
                            >
                              Cancel
                            </CancelButton>
                            {isCancelBoxOpen[propose.propose_id] && (
                              <CancelBox
                                isOpen={isCancelBoxOpen[propose.propose_id]}
                                isBidder={true}
                                onClose={() =>
                                  handleCancelBox(propose.propose_id)
                                }
                                proposal={propose}
                              />
                            )}
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
