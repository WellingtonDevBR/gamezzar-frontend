import {
  Button,
  ButtonContainer,
  HeaderContainer,
  ImageContainer,
  LeftHeaderContainer,
  RightHeaderContainer,
} from "./styles";
import controllerImg from "../../../../assets/controller.svg";
import rocketImg from "../../../../assets/rocket.svg";
import noteImg from "../../../../assets/note.svg";

// Header Component
export function PromoContent() {
  return (
    <HeaderContainer>
      <LeftHeaderContainer>
        <h1>
          Discover, find,<p>Trade extraordinary</p>Games
        </h1>
        <p>Marketplace For Exchanging Games Globally</p>
        <ButtonContainer>
          <Button primary={"#fff"} secondary={"#000"}>
            <img src={rocketImg} alt="rocket" />
            Explorer
          </Button>
          <Button primary={"#000"} secondary={"#fff"}>
            <img src={noteImg} alt="note" />
            Create
          </Button>
        </ButtonContainer>
      </LeftHeaderContainer>
      <RightHeaderContainer>
        <ImageContainer>
          <img src={controllerImg} alt="controller" />
        </ImageContainer>
      </RightHeaderContainer>
    </HeaderContainer>
  );
}
