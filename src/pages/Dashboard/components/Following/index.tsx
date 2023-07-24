import {
  Container,
  MainProfileContainer,
  CardProfileSection,
  CardProfileContainer,
  UnfollowButton,
} from "./styles";

export function Following() {
  return (
    <Container>
      <h1>Following</h1>
      <MainProfileContainer>
        <CardProfileContainer>
          <CardProfileSection>
            <img
              src="https://gamezzar-images.s3.us-east-2.amazonaws.com/avatar/avatar1.svg"
              alt="avatar"
            />
            <div>
              <strong>Nome do usuário</strong>
              <span>Cotia / SP</span>
            </div>
          </CardProfileSection>
          <UnfollowButton>Unfollow</UnfollowButton>
        </CardProfileContainer>
      </MainProfileContainer>
    </Container>
  );
}
