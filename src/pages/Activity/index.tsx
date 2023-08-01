
import {
  BoxContainer,
  Thumbnail,
  ContentContainer,
  Container,
  SubNames,
  SubTitle,
  PageNav,
  Title,
  LeftContainer,

RightContainer,
  SearchContainer, SearchInput, SearchIconBox 
  
} from "./styles";
import FilterBox from "./FilterBox";

import { ChatText, HeartStraight, MagnifyingGlass, ShoppingCartSimple, User, Wallet } from "phosphor-react";


export function Activity() {
  return (
    <>
      <PageNav>
        <Title>Activity</Title>
        <SubTitle>Home/Activity/Activity1</SubTitle>
      </PageNav>
      <Container>
        <LeftContainer>
        <BoxContainer>
        <Thumbnail src="https://source.unsplash.com/random" alt="Thumbnail" />
          <ContentContainer>
            <h1>Monica Lucas </h1>
            <SubNames>
              <span>started following <span style={{ fontWeight: 'bold', color: '#5142FC' }}>Gayle Hicks</span></span>
            </SubNames>
            <SubNames>
            <span>At 2:30PM on 19th June, 2021</span>
            </SubNames>
          </ContentContainer>
          <div style={{ background: "black", borderRadius: "50%", padding: "20px" }}>
          <User size={25} weight="bold" /> </div>
        </BoxContainer>

        <BoxContainer>
          <Thumbnail src="https://source.unsplash.com/random" alt="Thumbnail" />
          <ContentContainer>
            <h1>Wow! that Brain is Floating</h1>
            <SubNames>
              <span>started following <span style={{ fontWeight: 'bold', color: '#5142FC' }}>Gayle Hicks</span></span>
            </SubNames>
            <SubNames>
            <span>At 2:30PM on 19th June, 2021</span>
            </SubNames>
          </ContentContainer>
          <div style={{ background: "black", borderRadius: "50%", padding: "20px" }}>
          <ChatText size={25} weight="thin" /> </div>
        </BoxContainer>

        <BoxContainer>
        <Thumbnail src="https://source.unsplash.com/random" alt="Thumbnail" />
          <ContentContainer>
            <h1>Wow! That Brain is Floating</h1>
            <SubNames>
              <span>started following <span style={{ fontWeight: 'bold', color: '#5142FC' }}>Gayle Hicks</span></span>
            </SubNames>
            <SubNames>
            <span>At 2:30PM on 19th June, 2021</span>
            </SubNames>
          </ContentContainer>

          <div style={{ background: "black", borderRadius: "50%", padding: "20px" }}><ShoppingCartSimple size={25} weight="thin"  /></div>
        </BoxContainer>

        <BoxContainer>
        <Thumbnail src="https://source.unsplash.com/random" alt="Thumbnail" />
          <ContentContainer>
            <h1>Monica Lucas</h1>
            <SubNames>
              <span>started following <span style={{ fontWeight: 'bold', color: '#5142FC' }}>Gayle Hicks</span></span>
            </SubNames>
            <SubNames>
            <span>At 2:30PM on 19th June, 2021</span>
            </SubNames>
          </ContentContainer>
          <div style={{ background: "black", borderRadius: "50%", padding: "20px" }}>
          <HeartStraight size={25} weight="light" /> </div>
        </BoxContainer>

        <BoxContainer>
        <Thumbnail src="https://source.unsplash.com/random" alt="Thumbnail" />
          <ContentContainer>
            <h1>John Doe</h1>
            <SubNames>
            <SubNames>
              <span>started following <span style={{ fontWeight: 'bold', color: '#5142FC' }}>Gayle Hicks</span></span>
            </SubNames>
            <SubNames>
            <span>At 2:30PM on 19th June, 2021</span>
            </SubNames>
            </SubNames>
          </ContentContainer>
          <div style={{ background: "black", borderRadius: "50%", padding: "20px" }}>
          <Wallet size={25} weight="light" /> </div>
        </BoxContainer>
        </LeftContainer>
        <RightContainer>
        <SearchContainer>
      <SearchInput
        placeholder='Enter your word art'
      />
      <SearchIconBox>
      <MagnifyingGlass size={32} weight="light" />
      </SearchIconBox>
    </SearchContainer>
    <span style= {{padding: "5px", fontSize:"20px", fontWeight:"bolder"}}>
    <h1>Filter</h1></span>
    <FilterBox />
    </RightContainer>
    
    </Container>
    </>
  );
}
