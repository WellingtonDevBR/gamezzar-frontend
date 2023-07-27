import { useEffect, useState } from "react";
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
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { getAxiosInstance } from "../../../../services/axios";

export function Collection() {
  const token = Cookies.get("token");
  const [collection, setCollection] = useState<any[]>([]);
  useEffect(() => {
    async function getCollectionList() {
      const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("/api/user-collection/all");
      setCollection(response.data);
    }
    getCollectionList();
  }, []);
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
          {collection?.map((game) => (
            <tr>
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
                <span>{game.score}</span>
              </TableDataCellScore>
              <TableDataCellLevel>
                <img src="https://cdn.trocajogo.net/static/gauge3.svg" />
              </TableDataCellLevel>
              <TableDataCellEdit>
                <NavLink
                  to={`/game/add/${game.game_id}`}
                  state={{ from: game }}
                >
                  <span>Edit</span>
                </NavLink>
              </TableDataCellEdit>
            </tr>
          ))}
        </TableBodyContainer>
      </TableContainer>
    </Container>
  );
}
