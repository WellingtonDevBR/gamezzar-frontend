import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1000px;
  height: 100%;
  margin: 20px auto;
`;

export const GameSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
`;

export const Button = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  height: 54px;
  padding: 0 20px;
  transition: all 0.2s;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 20px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const Card = styled.div`
  border-radius: 4px;
  margin-top: 20px;
  border: 1px solid #c6c6c6;
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
  background-color: #c6c6c6;
`;

interface TabProps {
  active?: boolean;
}

export const Tab = styled.button<TabProps>`
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  color: white;
  font-size: 0.85rem;

  background: ${(props) =>
    props.active
      ? `linear-gradient(
      24deg,
      rgba(12, 7, 27, 1) 0%,
      rgba(21, 6, 69, 1) 19%,
      rgba(3, 1, 9, 1) 54%,
      rgba(6, 3, 47, 1) 100%
    );`
      : ""};
`;

export const TabPanel = styled.div`
  padding: 10px;

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`;

export const Table = styled.table`
  width: 100%;
`;

export const TableHead = styled.thead`
  tr {
    display: grid;
    grid-template-columns: repeat(6, 1fr); /* 6 columns with equal width */
    align-items: center;
    column-gap: 10px; /* Add space between columns */
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    color: #c6c6c6;

    th {
      display: flex;
      align-items: center;
      justify-content: center; /* Center the content horizontally */
    }
  }
`;

export const TableBody = styled.tbody`
  tr {
    display: grid;
    grid-template-columns: repeat(6, 1fr); /* 6 columns with equal width */
    align-items: center;
    column-gap: 10px; /* Add space between columns */
    margin-top: 10px;
  }

  td {
    display: flex;
    align-items: center;
    justify-content: center; /* Center the content horizontally */
  }

  th:first-child {
    display: flex;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0.2em;
    }
    p {
      margin-left: 5px;
      font-size: 14px;
    }
    span {
      margin-left: 5px;
      font-size: 8px;
    }
    img {
      width: 50px; /* Set the width of the image to 50px */
      height: 50px; /* Optionally, set the height of the image */
      margin-right: 5px; /* Add some space between the image and the text */
    }
  }
`;

export const Form = styled.form``;

export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Select = styled.select`
  width: 70%;
  height: calc(1em + 0.5rem + 2px);
  white-space: nowrap;
  color: #495057;
  margin-top: 0.5rem;
`;
