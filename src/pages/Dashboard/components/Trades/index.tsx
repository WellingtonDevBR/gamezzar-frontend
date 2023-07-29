import { Container, InactiveTradesImageContainer } from "./styles";
import { useState } from "react";

export function Trades() {
  const [activeTab, setActiveTab] = useState(false);
  return (
    <Container>
      <h1>Ongoing Trades</h1>
      <div>
        {(() => {
          switch (activeTab) {
            case true:
              return (
                <>
                  <img
                    src="https://cdn.trocajogo.net/static/undraw/undraw_accept_request_vdsd.svg"
                    alt="Project Image"
                  />
                  <h4>No received proposals</h4>
                  <p>
                    To receive more proposals, try increasing the interest level
                    of games in your collection.
                  </p>
                </>
              );
            case false:
              return (
                <InactiveTradesImageContainer>
                  <img
                    src="https://cdn.trocajogo.net/static/undraw/undraw_Group_chat_unwm.svg"
                    alt="Project Image"
                  />
                  <h4>No sent proposals</h4>
                  <p>All the proposals you send will appear here...</p>
                </InactiveTradesImageContainer>
              );
          }
        })()}
      </div>
    </Container>
  );
}
