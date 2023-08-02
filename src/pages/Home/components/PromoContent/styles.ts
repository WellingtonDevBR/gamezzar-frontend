import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  color: white;
  line-height: 38px;

  h1 {
    margin-bottom: 1rem;
    p {
      /* Warning: no fallback */
      background: -webkit-linear-gradient(52deg, #e250e5 20%, #4b50e6 80%);
      -webkit-background-clip: text;
      -webkit-text-stroke: 2px transparent;
      color: #14141f;
    }
  }

  p:nth-child(2) {
    font-size: 0.895rem;
  }

  @media (max-width: 800px) {
    padding: 0;
  }
`;

export const ImageContainer = styled.div`
  img {
    width: 500px;
    height: 100%;
    border-radius: 0.8rem;
  }

  // Adjust the size for tablets
  @media (max-width: 768px) {
    width: 80%; // Adjust this as needed
  }

  // Adjust the size for mobile devices
  @media (max-width: 480px) {
    width: 100%; // Adjust this as needed
  }
`;

export const LeftHeaderContainer = styled.div`
  h1 {
    font-size: 32px;
  }
`;

export const RightHeaderContainer = styled.div``;

export const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: flex-start;
  color: white;
  margin-top: 2rem;
  gap: 1rem;
`;

interface ButtonStyled {
  primary: string;
  secondary: string;
}

export const Button = styled.button<ButtonStyled>`
  display: flex;
  flex-direction: row;
  width: 9.625rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid #5142fc;
  border-radius: 7rem;
  background-color: transparent;
  gap: 1rem;
  color: white;
  

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.secondary};
    transition: 0.5s;
    color: ${(props) => props.primary};
  }
`;


