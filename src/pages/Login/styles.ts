import styled from "styled-components";

export const PageNav = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  background-color: #343434;
  color: #fff;
  padding: 2.5rem;
  box-sizing: border-box;
  box-shadow: none;
`;

export const Title = styled.h3`
  color: #fff;
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

export const SubTitle = styled.h3`
  font-family: "Urbanist";
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  margin: 0;
  text-align: center;
  line-height: 28px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100%;
  flex-shrink: 0;
  margin: 3rem auto;
  

  h1 {
    font-family: "Urbanist";
    font-weight: 400;
    margin-bottom: 2px;
  }
`;



export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  gap: .5rem;
  font-size: 14px;
`;
export const Input = styled.input`
  width: 100%;
  
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px ;
  background: transparent;
  color: #343434;
  border-radius: 4px;
  border: 1px solid #343434;

`;

export const Loginbtn = styled.button`
  width: 100%;
  padding: 10px;
  font-family: Urbanist;
  font-size: 14px;
  font-weight: 700;
  background: #020220;
  border: 1px solid #fff;
  color: #fff;
  justify-content: space-between;
  border-radius: 20px;
  margin-top: 1rem;
  cursor: pointer;
`;

export const LoginFormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  font-size: 14px;
  
  div {
    display: flex;
    gap: 0.5rem;
  }
  
`;


export const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 1rem;
  gap: 10px;
  width: 100%;

  span {
    display: inline-block;
    text-align: center;
    
    
  }
  section {
    display: flex;
    gap: 10px;
  }

  button {
    width: 100%;
    border: 1px solid rgba(81, 66, 252, 1);
    align-items: center;
    border-radius: 1rem;
    height: 2rem;
    
    background-color: transparent;
    color: white;
    font-weight: bold;
    font-size: 14px;
  }
`;
