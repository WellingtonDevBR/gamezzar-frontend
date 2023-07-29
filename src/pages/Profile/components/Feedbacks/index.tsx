import {
  Container,
  ImagesContainer,
  FooterSectionContainer,
  FooterArticleContainer,
  FooterUserContainer,
  FooterUserImage,
  FooterUserContent,
} from "./styles";

export function Feedback() {
  return (
    <Container>
      <ImagesContainer>
        <img
          src="https://gamezzar-images.s3.us-east-2.amazonaws.com/games/ac-valhalla.jpg"
          alt=""
        />
        <img
          src="https://gamezzar-images.s3.us-east-2.amazonaws.com/games/call-of-duty-warzone.png"
          alt=""
        />
      </ImagesContainer>
      <FooterSectionContainer>
        <FooterArticleContainer>
          <p>
            Quick and smooth transaction. The game is in perfect condition. I
            recommend it to everyone on Troca Jogo.
          </p>
          <span>18/05/2020 20:41</span>
        </FooterArticleContainer>
        <FooterUserContainer>
          <FooterUserImage>
            <img
              src="https://gamezzar-images.s3.us-east-2.amazonaws.com/avatar/avatar1.svg"
              alt=""
            />
          </FooterUserImage>
          <FooterUserContent>
            <h1>Marcelo</h1>
            <span>São Paulo / SP</span>
          </FooterUserContent>
        </FooterUserContainer>
      </FooterSectionContainer>
    </Container>
  );
}
