import { NavLink } from "react-router-dom";
import {
  CardContainer,
  CardFooterContent,
  CardSection,
  CardTitle,
  CardOwner,
  OwnerDetails,
} from "./styles";
import { Button } from "../../../../../../components/Button";

interface CardProps {
  src: string;
  alt: string;
  title: string;
  owner: string;
  avatar: string;
  token: string;
  onTradeClick: () => any;
}

export function CardGame(props: CardProps) {
  return (
    <CardContainer>
      <img src={props.src} alt={props.alt} />
      <CardSection>
        <div>
          <CardTitle>{props.title}</CardTitle>
        </div>
        <CardFooterContent>
          <CardOwner>
            <img src={props.avatar} alt="Owner" />
            <OwnerDetails>
              <h3>Owned by</h3>
              <h4>{props.owner}</h4>
            </OwnerDetails>
          </CardOwner>
          <div>
            {!props.token ? (
              <>
                <NavLink style={{ all: "revert" }} to="/login">
                  <Button style={{ width: "100px", height: "40px" }}>
                    Trade
                  </Button>
                </NavLink>
                <button>View History</button>
              </>
            ) : (
              <>
                <Button primary onClick={props.onTradeClick}>
                  Trade
                </Button>
                <button>View History</button>
              </>
            )}
          </div>
        </CardFooterContent>
      </CardSection>
    </CardContainer>
  );
}
