
import { ArrowsClockwise, Heart, Tote } from "phosphor-react";
import {
  HeaderContainer,
  HeaderSpanContent,
  SpanOptionsContainer,
  ImageContainer,
  MainContainer,
  BoxContainer,
  Button,
} from './styles';

interface CardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  id: string;
}

export const CardBox: React.FC<CardProps> = ({ image, title, description, price, id }) => {
  return (
    <BoxContainer>
      <HeaderContainer>
        <HeaderSpanContent>
          <SpanOptionsContainer
            width="60px"
            height="20px"
            backgroundColor="#14141F"
            color="white"
          >
            <Heart size={15} weight="light" /> 100
          </SpanOptionsContainer>
        </HeaderSpanContent>
        <ImageContainer>
          <img src={image} alt={title} />
        </ImageContainer>
      </HeaderContainer>
      <MainContainer>
        <section>
          <h1> "Cyber Doberman #766"</h1>
          <span>Price: {price}</span>
        </section>
        <footer>
          <div>
            <img src="https://gamezzar-images.s3.us-east-2.amazonaws.com/avatar/avatar1.svg" alt="Avatar" />
          </div>
          <div>
            <p>Owned By</p>
            <span>Freddie Carpenter </span>
            <section>
              <Button>
                <Tote size={15} weight="light" />   Trade
              </Button>
              <div>
                <ArrowsClockwise size={15} weight="light" /> View History</div>
              
           
                
             
            </section>
          </div>
        </footer>
      </MainContainer>
    </BoxContainer>
  );
};

export default CardBox;
