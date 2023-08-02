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
import {
  satisfactionMapping,
  dispositionMapping,
} from "../../../../helper/constants";

export function Collection() {
  const token = Cookies.get("token");
  const [collection, setCollection] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCollectionList() {
      const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get("/api/user-collection/all");
        console.log('response', response)
        setCollection(response.data);
      } catch (error) {
        console.error("Error fetching collection:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getCollectionList();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner component if you prefer
  }
  console.log(collection)
  return (
    <Container>
      <h1>Collection</h1>
      <TableContainer>
        <TableHeaderContainer>
          <tr>
            <th style={{ textAlign: "left" }}>Game</th>
            <th style={{ textAlign: "left" }}>Game Review</th>
            <th style={{ textAlign: "left" }}>Distribution</th>
          </tr>
        </TableHeaderContainer>
        <TableBodyContainer>
          {collection?.map((game) => (
            <tr>
              <TableDataCellGame>
                <img
                  src={`${import.meta.env.VITE_S3_URL}/games/${
                    game.item.image
                  }`}
                  alt="Game"
                />
                <div>
                  <span>{game.item.title}</span>
                  <span>{game.item.platform.name}</span>
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
