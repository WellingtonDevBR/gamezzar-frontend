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
  SignalImage,
} from "./styles";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { getAxiosInstance } from "../../../../services/axios";
import { satisfactionMapping, dispositionMapping } from "../../../../helper/constants";

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
            <th style={{ textAlign: "left" }}>Satisfaction</th>
            <th style={{ textAlign: "left" }}>Disposition</th>
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
                <span>
                  <SignalImage
                    code={satisfactionMapping(game.satisfaction) - 1}
                    src={`${import.meta.env.VITE_S3_URL}/gauge/signal${
                      satisfactionMapping(game.satisfaction) - 1
                    }.svg`}
                    alt="test"
                  />
                </span>
              </TableDataCellScore>
              <TableDataCellLevel>
                <SignalImage
                  code={dispositionMapping(game.disposition) - 1}
                  src={`${import.meta.env.VITE_S3_URL}/gauge/signal${
                    dispositionMapping(game.disposition) - 1
                  }.svg`}
                  alt="test"
                />
              </TableDataCellLevel>
              <TableDataCellEdit>
                <NavLink
                  style={{ all: "unset" }}
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
