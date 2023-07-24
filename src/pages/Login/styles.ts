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
  width: 100%;
  height: 730px;;
  flex-shrink: 0;
  
  h1{
    font-family: "Urbanist";
    font-weight: 400;
    margin-bottom: 2px;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  
  
  
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

  input{
    border: .5px solid rgba(122, 121, 138, 1);
    border-radius: 8px;
    height: 2rem;
    min-width: 24rem;
    background-color: transparent;
    color: rgba(122, 121, 138, 1);
   
  }
  input:focus{
    outline: none;
  }
  
 
  button[type="submit"] {
    width: 100%;
    padding: 10px;
    font-family: Urbanist;
    font-size: 14px;
    font-weight: 700;
    background: #020220;
    border: 2px solid #fff;
    color: #fff;
    justify-content: space-between;
    border-radius: 20px;
    cursor: pointer;
  }
`;

export const Navlinks = styled.a`

    color: #fff;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    gap: 10px; 
    
    div {
      display: flex;
    justify-content: space-between;
    }
`;


 export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  
  margin-top: 1rem;
  gap:10px;
  width: 200px; 

  button{
    border: 1px solid rgba(81,66, 252, 1);
    align-items: center;
    border-radius: 1rem;
    height: 2rem;
    min-width: 12.375rem;
    background-color: transparent;
    color: white;
    font-weight: bold;
    font-size:14px;
  }
`;

