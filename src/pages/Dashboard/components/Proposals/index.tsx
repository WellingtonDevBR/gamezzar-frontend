import React, { useState } from "react";

import {
  Container,
  TabListContainer,
  TabListHeaderContainer,
  TabListMainContainer,
  TabListSection,
} from "./styles";

export function Proposal() {
  const [activeTab, setActiveTab] = useState("received");

  return (
    <Container>
      <h1>Proposals</h1>
      <TabListContainer>
        <TabListHeaderContainer>
          <TabListSection
            isActive={activeTab === "received"}
            onClick={() => setActiveTab("received")}
          >
            Received <span>(0)</span>
          </TabListSection>
          <TabListSection
            isActive={activeTab === "sent"}
            onClick={() => setActiveTab("sent")}
          >
            Sent <span>(0)</span>
          </TabListSection>
        </TabListHeaderContainer>
        <TabListMainContainer>
          {(() => {
            switch (activeTab) {
              case "received":
                return (
                  <>
                    <img
                      src="https://cdn.trocajogo.net/static/undraw/undraw_accept_request_vdsd.svg"
                      alt="Project Image"
                    />
                    <h4>No received proposals</h4>
                    <p>
                      To receive more proposals, try increasing the interest level of games in your collection.
                    </p>
                  </>
                );
              case "sent":
                return (
                  <>
                    <img
                      src="https://cdn.trocajogo.net/static/undraw/undraw_add_file_4gfw.svg"
                      alt="Project Image"
                    />
                    <h4>No sent proposals</h4>
                    <p>All the proposals you send will appear here...</p>
                  </>
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
