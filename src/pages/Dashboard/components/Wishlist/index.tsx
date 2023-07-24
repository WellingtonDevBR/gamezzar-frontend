import {
  Container,
  TableContainer,
  TableHeaderContainer,
  TableBodyContainer,
  TableDataCellGame,
  TableDataCellScore,
  TableDataCellEdit,
} from "./styles";

export function Wishlist() {
  return (
    <Container>
      <h1>Wishlist</h1>
      <TableContainer>
        <TableHeaderContainer>
          <tr>
            <th style={{ textAlign: "left" }}>Game</th>
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
              <img src="https://cdn.trocajogo.net/static/gauge3.svg" alt="gauge" />
            </TableDataCellScore>
            <TableDataCellEdit>
              <span>Edit</span>
            </TableDataCellEdit>
          </tr>
        </TableBodyContainer>
      </TableContainer>
    </Container>
  );
}
