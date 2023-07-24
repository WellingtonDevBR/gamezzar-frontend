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
`
export const Title = styled.h1`
font-family: 'Urbanist', Sans-serif;
font-weight: 600;
font-size: 2rem;
  margin: 0;
  text-align: center;
`
export const SubTitle = styled.h3`
font-size: 1rem;
font-family: 'Urbanist', Sans-serif;
font-weight: 400;
  margin: 4px;
  text-align: center;
  white-space: pre-wrap;
  word-break: break-word;
`
export const ContactPage = styled.div`
display: flex;
justify-content: space-between;
margin-top: 2rem;
padding: 2rem;

`

export const MapBox = styled.div`
width: 50%;
`

export const ContactForm = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const Paragraph = styled.p`
  margin-bottom: 1 rem;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ;
  border-radius: 4px;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #343444;
  color: #FFFF;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;