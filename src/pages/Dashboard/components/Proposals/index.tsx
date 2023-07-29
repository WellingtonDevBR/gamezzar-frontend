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
import { isAxiosError } from "axios";
import { getAxiosInstance } from "../../../../services/axios";

const proposes = [
  {
    propose_id: "4e7d122f-57fb-4305-a8c9-be25f3e5a98b",
    interested_user_id: "217e86d4-91eb-4f6a-acab-b4ffe4476184",
    interested_game_id: "8f33e16b-8747-4f1b-9a22-8a956d8d9a01",
    owner_user_id: "bfeddaf0-a068-447a-9df5-b6252da20ba5",
    owner_game_id: "8f33e16b-8747-4f1b-9a22-8a956d8d9a01",
    status: 3,
  },
];

export function Proposal() {
  const [activeTab, setActiveTab] = useState("received");
  const [userId, setUserId] = useState("");
  const [proposals, setProposals] = useState<any[]>([]);
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
    async function getProposals() {
      const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("/api/propose/all");
      setUserId(response.data.user_id);
      setProposals(response.data.proposals);
    }
    getProposals();
  }, []);

  return (
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
                        src="https://cdn.trocajogo.net/covers/psvita/20131029191905_vita_batman-arkham-origins-blackgate.jpg"
                        alt="Project Image"
                      />
                      <img
                        src="https://cdn.trocajogo.net/covers/psvita/20130627124354_vita_dead-or-alive-5.jpg"
                        alt="Project Image"
                      />
                      <ProposalCardRightSection>
                        <ProposalCardProfile>
                          <img
                            src="https://cdn.trocajogo.net/users/20200501000000_avatar.png"
                            alt="Project Image"
                          />
                          <div>
                            <h4>Game Name</h4>
                            <p>Game Description</p>
                          </div>
                        </ProposalCardProfile>
                        <ProposalCardButton>
                          <SendMessageButton type="button">
                            Enviar Mensagem
                          </SendMessageButton>
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
                        src="https://cdn.trocajogo.net/covers/psvita/20131029191905_vita_batman-arkham-origins-blackgate.jpg"
                        alt="Project Image"
                      />
                      <img
                        src="https://cdn.trocajogo.net/covers/psvita/20130627124354_vita_dead-or-alive-5.jpg"
                        alt="Project Image"
                      />
                      <ProposalCardRightSection>
                        <ProposalCardProfile>
                          <img
                            src="https://cdn.trocajogo.net/users/20200501000000_avatar.png"
                            alt="Project Image"
                          />
                          <div>
                            <h4>Game Name</h4>
                            <p>Game Description</p>
                          </div>
                        </ProposalCardProfile>
                        <ProposalCardButton>
                          <SendMessageButton type="button">
                            Enviar Mensagem
                          </SendMessageButton>
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
  );
}
