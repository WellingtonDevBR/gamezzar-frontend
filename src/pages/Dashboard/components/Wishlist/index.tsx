import {
  Container,
  TableContainer,
  TableHeaderContainer,
  TableBodyContainer,
  TableDataCellGame,
  TableDataCellScore,
  TableDataCellEdit,
} from "./styles";

export function Wishlist({ wishlist }: any) {
  return (
    <Container>
      <h1>Wishlist</h1>
      <TableContainer>
        <TableHeaderContainer>
          <tr>
            <th style={{ textAlign: "left" }}>Game</th>
            <th style={{ textAlign: "left" }}>Interest</th>
          </tr>
        </TableHeaderContainer>
        <TableBodyContainer>
          {wishlist.map((game: any, index: number) => (
            <tr key={index}>
              <TableDataCellGame>
                <img
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    game.details.image
                  }`}
                  alt="Game"
                />
                <div>
                  <span>{game.details.title}</span>
                  <span>{game.details.platform.name}</span>
                </div>
              </TableDataCellGame>
              <TableDataCellScore>
                <img
                  src="https://cdn.trocajogo.net/static/gauge3.svg"
                  alt="gauge"
                />
              </TableDataCellScore>
              <TableDataCellEdit>
                <span>Edit</span>
              </TableDataCellEdit>
            </tr>
          ))}
        </TableBodyContainer>
      </TableContainer>
    </Container>
  );
}
