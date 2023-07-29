import styled from 'styled-components';

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
    margin-bottom: 45px;
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
