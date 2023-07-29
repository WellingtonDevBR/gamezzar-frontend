
import { PageNav, Title, SubTitle, SelectHolder, SelectBtn, CardHolder ,Container, LoadMoreButton} from "./styles";
import Card from "./Card";

export function Explorer() {
  return (
    <>
      <PageNav>
        <Title>Explore</Title>
        <SubTitle>Home / Explore / Explore 1</SubTitle>
      </PageNav>
      <Container>
      <SelectHolder className="select-holder">
        <div>
          <SelectBtn className="select-btn">
            <option value="art">Art</option>
            <option value="music">Music</option>
            <option value="domain names">Domain Names</option>
            <option value="virtual world">Virtual World</option>
            <option value="trading cards">Trading Cards</option>
            <option value="sports">Sports</option>
            <option value="utility">Utility</option>
          </SelectBtn>
          <SelectBtn className="select-btn">
            <option value="trading now">Trading Now</option>
          </SelectBtn>
          <SelectBtn className="select-btn">
            <option value="all items">All Items</option>
          </SelectBtn>
        </div>
        <div>
          <SelectBtn className="select-btn">
            <option value="all games">All Games</option>
          </SelectBtn>
          <SelectBtn className="select-btn">
            <option value="sort by">Sort By</option>
          </SelectBtn>
        </div>
      </SelectHolder>
      <CardHolder className="card-holder">
        <Card like={100} title="The RenaiXance Rising" owner="SalvadorDali" isComingSoon={false} />
        <Card like={51} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
        <Card like={25} title="The Reminance of the owner of the world" owner="hero" isComingSoon={true} />
        <Card like={35} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
        <Card like={55} title="The Reminance of the owner of the world" owner="hero" isComingSoon={true} />
        <Card like={51} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
        <Card like={15} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
        <Card like={5} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
        <Card like={57} title="The Reminance of the owner of the world" owner="hero" isComingSoon={true} />
        <Card like={65} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
        <Card like={59} title="The Reminance of the owner of the world" owner="hero" isComingSoon={false} />
        <Card like={25} title="The Reminance of the owner of the world" owner="hero" isComingSoon={true} />
      </CardHolder>
      <LoadMoreButton>Load More</LoadMoreButton>
      </Container>
    </>
  );
}

export default Explorer;
