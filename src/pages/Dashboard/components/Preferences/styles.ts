import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 800px;
  height: 100%;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 45px;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  div {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  textarea {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ced4da;
    color: black;
  }

  h2 {
    margin: 10px 0;
  }
`;

export const InputForm = styled.input`
  display: flex;
  padding: 10px 5px;
  color: "#495057";
  border-radius: 4px;
  border: 1px solid #ced4da;
  color: black;
`;

export const SelectForm = styled.select`
  display: flex;
  padding: 10px 5px;
  color: "#495057";
  border-radius: 4px;
  border: 1px solid #ced4da;
  margin-bottom: 10px;
  color: black;
`;

export const FormSubmitButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 10px;
  float: right;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  transition: 0.3s;

  &:hover {
    background-color: #0069d9;
  }
  
  &:disabled {
    background-color: #c6c6c6;
    cursor: not-allowed;
  }
`;
