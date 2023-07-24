import styled from "styled-components";

const MAIN_WIDTH = "380px";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 650px;
  height: 100%;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

  h1 {
    margin-bottom: 45px;
  }

  section {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 40px;
    border-radius: 5px;
    border: 0;
    background-color: #1e90ff;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    transition: background-color 0.2s;
    float: right;

    &:hover {
      background-color: #1e90ff;
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: ${MAIN_WIDTH};
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  margin-bottom: 20px;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 80px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const SearchOutcomeList = styled.div`
  display: flex;
  flex-direction: column;
  width: ${MAIN_WIDTH};
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  max-height: 200px;

  &:hover {
    background-color: green;
    cursor: pointer;
  }
`;

export const PasswordBox = styled.footer`
  display: flex;
  flex-direction: column;
  width: ${MAIN_WIDTH};
  margin-top: 20px;
`;

export const SplitInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: ${MAIN_WIDTH};
  margin-top: 20px;

  input {
    width: 180px;
  }
`;

export const MainPasswordBox = styled.main`
  display: flex;
  flex-direction: column;
`;

interface FormImageLabelProps {
  backgroundColor?: string;
}

export const FormImageLabel = styled.label<FormImageLabelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 0;
  background-color: ${(props) => props.backgroundColor || "#1e90ff"};
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
