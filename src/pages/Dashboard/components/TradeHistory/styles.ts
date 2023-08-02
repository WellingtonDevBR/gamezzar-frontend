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

export const InactiveTradesImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 350px;
    height: 350px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;
