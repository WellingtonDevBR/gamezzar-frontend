import {
  Container,
  TableDataCellGame,
  TableDataCellScore,
  TableDataCellLevel,
  TableDataCellEdit,
  TableBodyContainer,
  TableHeaderContainer,
  TableContainer,
} from "./styles";

export function Collection() {
  return (
    <Container>
      <h1>Collection</h1>
      <TableContainer>
        <TableHeaderContainer>
          <tr>
            <th style={{ textAlign: "left" }}>Game</th>
            <th style={{ textAlign: "left" }}>Score</th>
            <th style={{ textAlign: "left" }}>Level</th>
          </tr>
        </TableHeaderContainer>
        <TableBodyContainer>
          <tr>
            <TableDataCellGame>
              <img
                src="https://gamezzar-images.s3.us-east-2.amazonaws.com/games/ac-valhalla.jpg"
                alt="Game"
              />
              <div>
                <span>Assassin`s Creed</span>
                <span>Playstation 4</span>
              </div>
            </TableDataCellGame>
            <TableDataCellScore>
              <span>10</span>
            </TableDataCellScore>
            <TableDataCellLevel>
              <img src="https://cdn.trocajogo.net/static/gauge3.svg" />
            </TableDataCellLevel>
            <TableDataCellEdit>
              <span>Edit</span>
            </TableDataCellEdit>
          </tr>
        </TableBodyContainer>
      </TableContainer>
    </Container>
  );
}
