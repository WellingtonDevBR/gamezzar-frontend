import {
  BoxContainer,
  Thumbnail,
  ContentContainer,
  Name,
  SubNames,
  SubTitle,
  PageNav,
  Title,
  EnterWordArtSectionContainer,
  EnterWordArtIcon,
  FilterWithTagsSectionContainer,
  FilterWithTagsIcon,
  Tag,
  FlexContainer,
} from "./styles";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChatIcon from "@mui/icons-material/Chat";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WalletIcon from "@mui/icons-material/Wallet";
import { Box } from "@mui/material";
import Filter from "./Filter";


export function Activity() {
  return (
    <div>
      <PageNav>
        <Title>Activity</Title>
        <SubTitle>Home/Activity/Activity1</SubTitle>
      </PageNav>
      <div>
        <div style={{ display: 'flex', width: "80%", margin: "0 auto" }}>
          <Box sx={{ width: "100%" }}>
            <BoxContainer>
              <Thumbnail src="https://source.unsplash.com/random" alt="Thumbnail" />
              <ContentContainer>
                <Name>John Doe</Name>
                <SubNames>
                  <span>Sub Name 1</span>
                  <span>Sub Name 2</span>
                  <span>Sub Name 2</span>
                </SubNames>
              </ContentContainer>

              <PeopleAltIcon />
            </BoxContainer>

            <BoxContainer>
              <Thumbnail src="https://source.unsplash.com/random" alt="Thumbnail" />
              <ContentContainer>
                <Name>Wow! that Brain is Floating</Name>
                <SubNames>
                  <span>started following Gayle Hicks</span>
                </SubNames>
                <SubNames>
                  <span>started following Gayle Hicks</span>
                </SubNames>
              </ContentContainer>
              <ChatIcon />
            </BoxContainer>

            <BoxContainer>
              <Thumbnail src="https://source.unsplash.com/random" alt="Thumbnail" />
              <ContentContainer>
                <Name>John Doe</Name>
                <SubNames>
                  <span>Sub Name 1</span>
                </SubNames>
                <SubNames>
                  <span>Sub Name 1</span>
                </SubNames>
              </ContentContainer>

              <ShoppingCartIcon />
            </BoxContainer>

            <BoxContainer>
              <Thumbnail src="https://source.unsplash.com/random" alt="Thumbnail" />
              <ContentContainer>
                <Name>Monica Lucas</Name>
                <SubNames>
                  <span>Sub Name 1</span>
                </SubNames>
                <SubNames>
                  <span>Sub Name 1</span>
                </SubNames>
              </ContentContainer>
              <FavoriteIcon />
            </BoxContainer>

            <BoxContainer>
              <Thumbnail src="https://source.unsplash.com/random" alt="Thumbnail" />
              <ContentContainer>
                <Name>John Doe</Name>
                <SubNames>
                  <span>Sub Name 1</span>
                  <span>Sub Name 2</span>
                  <span>Sub Name 2</span>
                </SubNames>
              </ContentContainer>
              <WalletIcon />
            </BoxContainer>
          </Box>
          <Box >
            <Filter />
          </Box>
        </div>

        {/* <FlexContainer>
          <EnterWordArtSectionContainer>
            <EnterWordArtIcon />
            <span>Enter Your Word Art</span>
          </EnterWordArtSectionContainer>

          <FilterWithTagsSectionContainer>
            <FilterWithTagsIcon />
            <span>Filter with Tags:</span>
            <div>
              <Tag>Tag 1</Tag>
              <Tag>Tag 2</Tag>
              <Tag>Tag 3</Tag>
            </div>
          </FilterWithTagsSectionContainer>
        </FlexContainer> */}
      </div>
    </div>
  );
}
