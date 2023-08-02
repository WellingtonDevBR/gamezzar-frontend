import { PageNav, Title, SubTitle, CardHolder, Container, LoadMoreButton } from "./styles";
import Card from "./Card";
import HeaderBox from "./HeaderBox";

export function TraderProfile() {
  return (
    <>
      <PageNav>
        <Title>Trader Profile</Title>
        <SubTitle>Home / Pages / Author</SubTitle>
      </PageNav>
      <HeaderBox title="Traders Profile" owner="SalvadorDali" isComingSoon={true} />  
      <Container>
        {/* Your existing content */}
        <CardHolder className="card-holder">
          <Card like={100} title="The RenaiXance Rising" owner="SalvadorDali" isComingSoon={false} />
          <Card like={51} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
          <Card like={51} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
          <Card like={51} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
          <Card like={51} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
          <Card like={51} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
          <Card like={51} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
          <Card like={51} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
        </CardHolder>
        <LoadMoreButton>Load More</LoadMoreButton>
      </Container>
    </>
  );
}

export default TraderProfile;
