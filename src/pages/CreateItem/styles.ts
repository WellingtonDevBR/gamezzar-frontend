import styled from "styled-components";

export const PageNav = styled.div`
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
  display: grid;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  width: 400;
  height: 100%;
  flex-shrink: 0;
  margin: 3rem auto;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 480px;
  border-radius: 20px;
  margin: 50px;

  background-color: #343444;
`;
export const HeaderContainer = styled.header`
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
 
  

  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    
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
  top: 40px;
`;

export const SpanOptionsContainer = styled.div<HeaderSpanProps>`
  width: ${(props) => props.width || "50px"};
  height: ${(props) => props.height || "50px"};
  background-color: ${(props) => props.backgroundColor || "#3a31c8"};
 
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  color: ${(props) => props.color || "#fff"};
  font-size: 14px;
  margin: 0 1px;
  font-weight: bold;
  margin-left: 0 10px;
`;

export const Button = styled.button`

  width:110px;
  height: 40px;
  padding: 10px 20px;
  background-color: transparent;
  color: #fff;
  font-weight: 600;
  border:1px solid #3a31c8;
  border-radius: 20px;
  cursor: pointer;
  margin-right:20px ;
  `;

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;

  gap: 20px;

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap:10px;

    h1 {
        font-size: 14px;
        font-weight: 600;
    }
  }



  footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap:10px;
   

    img {
      width: 33px;
      height: 33px;
    }
    p{
        font-size: 12px;
        color: var (-- white-2, #8A8AA0)
    }
    span{
        font-size: 12px;
        font-weight: bold;
        
    }
  }
`;
export const ItemDetails = styled.div`
width: 1000px;
height: 102px;
border-radius: 8px;
border: 1px solid var(--background-second, #343444);
flex-shrink: 0;
display:flex;
justify-content: space-between;

p{
    color: var(--white-2, #8A8AA0);
    font-family: Urbanist;
    font-size: 14px;
    font-style:normal;
    font-weight:400;
    line-height: 22px;
    margin: 25px 0;
    margin-right: 3rem;
    margin-left: 2rem;
}

button {
    
    width:152px;
    height: 48px;
    flex-shrink:0;
    border-radius: 30px;
    border: 1px solid var(--onsurface, #FFF);
    background: transparent;
    color: #FFF;
    margin: 25px 0;
    margin-right: 3rem;
}
`;
