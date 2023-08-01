// styles.ts
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  margin: 30px auto;
  p {
    margin-bottom: 10px;
    font-weight: bold;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  label {
    font-size: 14px;
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 5px;
    color: "#495057";
    border-radius: 4px;
    border: 1px solid #ced4da;
    margin-bottom: 10px;
    color: black;
  }
`;

export const Image = styled.img`
  width: 120px;
  height: 150px;
`;

export const Header = styled.header`
  display: flex;
  gap: 20px;
  margin-top: 40px;
  justify-content: space-between;
  width: 100%;
`;

export const GameDetails = styled.section`
  display: flex;
  gap: 20px;

  h2 {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const GameInfo = styled.section`
  display: flex;
  gap: 20px;
  div {
    width: 160px;
    color: black;

    select {
      width: 100%;
    }
  }
`;

export const SelectForm = styled.select`
  display: flex;
  padding: 5px;
  color: "#495057";
  border-radius: 4px;
  border: 1px solid #ced4da;
  margin-bottom: 10px;
  width: 250px;
  margin-top: 10px;
  color: black;
`;

export const MainForm = styled.form`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  flex-wrap: wrap; /* Allow child div elements to wrap when content overflows */
  margin-top: -70px;
  div {
    display: flex;
    flex-direction: column;
    width: 250px; /* Set a width to allow the div elements to wrap */
  }
`;

export const Button = styled.button`
  display: flex;
  background-color: ${(props) => props.theme["--primary"]};
  padding: 0.5em;
  margin-top: 0.5em;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
`;
