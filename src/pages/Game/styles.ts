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

interface ButtonContainerProps {
  isOwner: boolean;
}

export const ButtonContainer = styled.div<ButtonContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.isOwner ? "center" : "flex-start")};
  margin-top: 10px;
  gap: 12px;
`;

interface ButtonProps {
  backgroundColor: string;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  width: 100px;
  text-decoration: none;
  border-radius: 4px;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  font-size: large;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

export const IsOwnerOrWishButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  width: 100%;
  background-color: #0374ad;
  cursor: pointer;
  color: white;
  border-radius: 3px;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  margin-top: 10px;
  margin-bottom: 10px;
  transition: 0.2s;

  &:hover {
    background-color: #035e8b;
  }
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
  border: 1px solid #5142fc;
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
  background-color: #5142fc;
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
  display: flex;
  flex-direction: column;
  gap: 10px;

  form {
    display: flex;
    flex-direction: column;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    b {
      width: 120px;
    }
    span {
      font-size: 14px;
    }
    a {
      text-decoration: none;
      color: #c6c6c6;
      font-size: 14px;

      &:hover {
        color: #fff;
      }
    }
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
    border-top: 1px solid #5142fc;
    border-bottom: 1px solid #5142fc;
    color: white;

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
    }
  }
`;

interface SignalImageProps {
  code: number;
}

export const SignalImage = styled.img<SignalImageProps>`
  width: ${(props) => (props.code >= 0 ? "50px" : "30px")};
  height: ${(props) => (props.code >= 0 ? "50px" : "30px")};

  filter: ${(props) => {
    switch (props.code) {
      case -1:
        return "invert(24%) sepia(99%) saturate(7489%) hue-rotate(6deg) brightness(102%) contrast(104%)";
      case 0:
        return "invert(24%) sepia(99%) saturate(7489%) hue-rotate(6deg) brightness(102%) contrast(104%)";
      case 1:
        return "invert(97%) sepia(92%) saturate(6242%) hue-rotate(1deg) brightness(102%) contrast(101%)";
      case 2:
      case 3:
        return "invert(48%) sepia(99%) saturate(4263%) hue-rotate(201deg) brightness(91%) contrast(97%)";
      case 4:
        return "invert(85%) sepia(82%) saturate(1352%) hue-rotate(80deg) brightness(91%) contrast(83%)";
      default:
        return "";
    }
  }};
`;

export const ImageContainer = styled.th`
  min-width: 50px;
  min-height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  height: calc(1em + 1rem + 2px);
  white-space: nowrap;
  color: #495057;
  margin-top: 0.5rem;
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 140px;
`;
