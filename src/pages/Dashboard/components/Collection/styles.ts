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
    margin-bottom: 50px;
  }
`;

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

export const TableHeaderContainer = styled.thead``;

export const TableBodyContainer = styled.tbody`
  tr {
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }
`;

export const TableDataCellGame = styled.td`
  display: flex;

  div {
    gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
  }

  img {
    width: 80px;
    height: 100px;
  }
`;

export const TableDataCellScore = styled.td``;

export const TableDataCellLevel = styled.td``;

export const TableDataCellEdit = styled.td`
  span {
    cursor: pointer;
    color: #3f51b5;
  }
`;

interface SignalImageProps {
  code: number;
}

export const SignalImage = styled.img<SignalImageProps>`
  width: 50px;
  height: 50px;
  filter: ${(props) => {
    console.log("props: ", props.code);
    switch (props.code) {
      case -1:
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
