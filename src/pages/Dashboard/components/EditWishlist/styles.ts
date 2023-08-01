import styled from "styled-components";
import { forwardRef } from "react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 750px;
  border-radius: 5px;
  margin: 0 auto;
  padding: 20px;

  img {
    width: 120px;
    height: 150px;
  }

  footer {
    display: flex;
    justify-content: flex-end;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;

  h1 {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

export const Main = styled.main`
  display: flex;
  gap: 1em;
  margin-top: 2em;

  form {
    display: flex;
    gap: 1em;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1 {
      font-size: 1.6rem;
      font-weight: bold;
    }
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.3em;

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
  }

  select {
    display: flex;

    width: 100%;
    padding: 10px 5px;
    color: black;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  color: black;
`;

// export const Select = forwardRef((props, ref) => <SelectBase {...props} ref={ref} />);

export const UpdateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5142fc;
  width: 150px;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #025b70;
  }
`;

export const RemoveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fc5142;
  width: 125px;
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #fc5130;
  }
`;
