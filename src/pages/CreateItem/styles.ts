import styled from "styled-components";

export const PageNav = styled.div`
  width: 1350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #343444;
  color: #fff;
  padding: 2.5rem;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-family: "Urbanist", Sans-serif;
  font-weight: 600;
  font-size: 2rem;
  margin: 0;
  text-align: center;
`;

export const SubTitle = styled.h3`
  font-size: 1rem;
  font-family: "Urbanist", Sans-serif;
  font-weight: 400;
  margin: 4px;
  text-align: center;
`;

export const Container = styled.div`
 width: 100%;
  max-width: 1200px; /* Set the maximum width for the container */
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const BoxContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 440px;
  border-radius: 20px;
  margin: 20px; /* Adjust the margin to provide proper spacing */
  background-color: #343444;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 290px;
  height: 290px;
  border-radius: 20px;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 2px 0;
  
  img {
    width: 260px;
    height: 260px;
    border-radius: 20px;
    margin: 3.5rem 1rem;
  }
`;

interface HeaderSpanProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
}

export const HeaderSpanContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  top: 60px;
`;

export const SpanOptionsContainer = styled.div<HeaderSpanProps>`
  width: ${(props) => props.width || "50px"};
  height: ${(props) => props.height || "50px"};
  background-color: ${(props) => props.backgroundColor || "#3a31c8"};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: ${(props) => props.color || "#fff"};
  font-size: 14px;
  margin: 0 1px;
  font-weight: bold;
  margin-left: 0 10px;
`;

export const Button = styled.button`
  width: 100px;
  height: 30px;
  background-color: transparent;
  color: #fff;
  font-weight: 600;
  border: 1px solid #3a31c8;
  font-size: 16px;
  border-radius: 20px;
  padding: 2px 2px 2px 2px;
 
`;

export const MainContainer = styled.div`
   width: 100%;
  max-width: 800px; 
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;

    h1 {
      padding: 0px 0;
      font-size: 14px;
      font-weight: 600;
    }
  }

  footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    padding: 2px 0;

    img {
      width: 33px;
      height: 33px;
    }
    p {
      font-size: 12px;
      color: #8a8aa0;
    }
    span {
      font-size: 12px;
      font-weight: bold;
      
    }
    section {
      margin: 1rem;
      padding: 1rem;
    }
  }
`;

export const ItemDetails = styled.div`
width: 100%;
  max-width: 800px; 
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  margin-top: 20px; 

  h3 {
    margin: 1rem 0;
    font-size: 18px;
  }

  button {
    width: 152px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 30px;
    border: 1px solid #fff;
    background: transparent;
    color: #fff;
    margin-top: 2px;
  }
  input {
    width: 800px;
    height: 50px;
    border: 1px solid #343444;
    border-radius: 8px;
    padding: 9px;
    background-color: transparent;
    color: #fff;
    margin-bottom: 30px;
  }
  input[name="Description"] {
    height: 100px;
    line-height: 1.5;
    padding: 2rem;
  }
`;

export const MethodBoxes = styled.div`
  width: 100%;
  max-width: 900px;
  height: 100px;
  border-radius: 8px;
  margin: 3rem auto;
  border: 1px solid #343444;
  display: flex;
  flex-direction: row;

  p {
    color: #8a8aa0;
    font-family: Urbanist;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    margin: 1rem 1rem;
  }

  h1 {
    margin: 1rem 0;
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }

  button {
    width: 150px;
    height: 40px;
    display: flex;
    margin: 2rem 9rem;
    justify-content: space-around;
    padding: 10px;
  }
`;

export const BtnBox = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 10px;
  margin: 0 auto;
  display: flex;
  gap: 10px;
  justify-content: space-around;

  button {
    width: 260px;
    height: 40px;
    display: flex;
    background: #fff;
    justify-content: center;
    padding: 10px;
    border: 1px solid #343444;
    border-radius: 10px;
    color: #5142fc;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
  }
`;

export const BtnBox2 = styled.div`
display: flex;
flex-direction: row;
`;