import {
  Container,
  PopularCollectionsCard,
  PopularCollectionsHeader,
  PopularCollectionsContent,
  PopularCollectionsList,
  Main,
  SmallImages,
  LargeImage,
  Section,
} from "./styles";
import zeldaImg from "../../../../assets/zelda.svg";
import battlefieldImg from "../../../../assets/battlefield.svg";
import finalfantasyImg from "../../../../assets/finalfantasy.svg";
import metalgear from "../../../../assets/metalgear.svg";
import tkof from "../../../../assets/tkof.svg";
import mario from "../../../../assets/mario.svg";
import { Heading, Text } from "@chakra-ui/react";

export function PopularCollection() {
  return (
    <Container>
      <Heading as="h1" mb={3} mt={10}>
        <Text fontSize="3xl">Top Sellers</Text>
      </Heading>
      <PopularCollectionsList>
        <PopularCollectionsCard>
          <PopularCollectionsHeader>
            <ImageContainer src={zeldaImg} alt="Zelda" />
            <PopularHeaderContent
              title="Action Games"
              number={100}
              name="Ralph Garraway"
            />
          </PopularCollectionsHeader>
          <PopularCollectionsContent>
            <Main>
              <ImageContainer src={battlefieldImg} alt="Main Image" />
            </Main>
            <Section>
              <SmallImages>
                <ImageContainer src={finalfantasyImg} alt="Section Image 1" />
                <ImageContainer src={metalgear} alt="Section Image 2" />
              </SmallImages>
              <LargeImage>
                <ImageContainer src={metalgear} alt="Section Image 3" />
              </LargeImage>
            </Section>
          </PopularCollectionsContent>
        </PopularCollectionsCard>
        <PopularCollectionsCard>
          <PopularCollectionsHeader>
            <ImageContainer src={zeldaImg} alt="Zelda" />
            <PopularHeaderContent
              title="Action Games"
              number={100}
              name="Ralph Garraway"
            />
          </PopularCollectionsHeader>
          <PopularCollectionsContent>
            <Main>
              <ImageContainer src={tkof} alt="Main Image" />
            </Main>
            <Section>
              <SmallImages>
                <ImageContainer src={mario} alt="Section Image 1" />
                <ImageContainer src={metalgear} alt="Section Image 2" />
              </SmallImages>
              <LargeImage>
                <ImageContainer src={metalgear} alt="Section Image 3" />
              </LargeImage>
            </Section>
          </PopularCollectionsContent>
        </PopularCollectionsCard>
      </PopularCollectionsList>
    </Container>
  );
}

export const PopularHeaderContent = ({ title, number, name }: any) => (
  <div
    style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
  >
    <div>
      <h3>{title}</h3>
      <span>{name}</span>
    </div>
    <span
      style={{
        width: "64px",
        height: "28px",
        flexShrink: 0,
        borderRadius: "10px",
        background: "var(--background, #14141F)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {number}
    </span>
  </div>
);

const ImageContainer = ({ src, alt }: any) => <img src={src} alt={alt} />;
