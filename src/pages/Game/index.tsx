import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import {
  Container,
  GameSection,
  Button,
  ButtonContainer,
  DescriptionContainer,
  Card,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  MainContainer,
  Table,
  TableHead,
  TableBody,
  Select,
  Form,
  Label,
  ProductImage,
} from "./styles";
import { useState, useEffect } from "react";
import { StyledChartComponent } from "../../helper/chart";
import { getAxiosInstance } from "../../services/axios";

interface GameProps {
  description: string;
  title: string;
  region: string;
  release_date: string;
  producer: string;
  genre: string;
  category: string;
  official_link: string;
  image: string;
  official_video_link: string;
  slug: string;
}

export function Game() {
  const [selectedTab, setSelectedTab] = useState("owners");
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const [game, setGame] = useState<GameProps>({
    description: "",
    title: "",
    region: "",
    release_date: "",
    producer: "",
    genre: "",
    category: "",
    official_link: "",
    image: "",
    official_video_link: "",
    slug: "",
  });

  const dateObject = new Date(game.release_date);
  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1 to get the correct month.
  const year = dateObject.getFullYear().toString();

  const formattedDate = `${day}/${month}/${year}`;
  let { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
      const response = await axios.get(`/api/game/${id}`);
      setGame(response.data);
    }
    fetchData();
    window.scrollTo(0, 0);
    setLoading(false);
  }, []);

  return (
    <Container>
      <GameSection>
        <div>
          <ProductImage
            src={`${import.meta.env.VITE_S3_URL}/games/${game.image}`}
            alt="Product"
          />
        </div>
        <div>
          <span>{game.producer}</span> {/* should add platform type like ps4*/}
          <h1>{game.title}</h1>
          <DescriptionContainer
            dangerouslySetInnerHTML={{ __html: game.description }}
          />
          <ButtonContainer>
            <NavLink style={{ textDecoration: "none" }} to="/chat">
              <Button backgroundColor={"#9b4545"}>I want</Button>
            </NavLink>
            <NavLink
              style={{ textDecoration: "none" }}
              to={{
                pathname: `/game/add/${id}`,
              }}
              state={{ from: game }}
            >
              <Button backgroundColor={"#2d5f2d"}>I have</Button>
            </NavLink>
          </ButtonContainer>
        </div>
        <div>
          <StyledChartComponent />
          <iframe
            style={{ border: "none" }}
            width="320"
            height="240"
            src={game.official_video_link}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </GameSection>
      <MainContainer>
        <Card>
          <Tabs>
            <TabList>
              <Tab
                active={selectedTab === "owners" ? true : false}
                onClick={() => setSelectedTab("owners")}
              >
                Owners
              </Tab>
              <Tab
                active={selectedTab === "interested" ? true : false}
                onClick={() => setSelectedTab("interested")}
              >
                Interested
              </Tab>
              <Tab
                active={selectedTab === "datasheet" ? true : false}
                onClick={() => setSelectedTab("datasheet")}
              >
                Datasheet
              </Tab>
            </TabList>

            {selectedTab === "owners" && (
              <TabPanel>
                <Form>
                  <Label>
                    Version
                    <Select>
                      <option value="normal">Normal</option>
                      <option value="greatestHits">Greatest Hits</option>
                      <option value="platinum">Platinum</option>
                      <option value="gameOfYear">Game of the Year</option>
                      <option value="ultimate">Ultimate</option>
                      <option value="collector">Collector</option>
                      <option value="other">Other</option>
                    </Select>
                  </Label>
                  <Label>
                    Region
                    <Select>
                      <option value="america">America</option>
                      <option value="europe">Europe</option>
                      <option value="asia">Asia</option>
                      <option value="oceania">Oceania</option>
                    </Select>
                  </Label>
                  <Label>
                    State
                    <Select>
                      <option value="NSW">New South Wales</option>
                      <option value="VIC">Victoria</option>
                      <option value="QLD">Queensland</option>
                      <option value="SA">South Australia</option>
                      <option value="WA">Western Australia</option>
                      <option value="TAS">Tasmania</option>
                      <option value="NT">Northern Territory</option>
                      <option value="ACT">Australian Capital Territory</option>
                    </Select>
                  </Label>
                  <label>
                    <input type="checkbox" /> Only those I follow
                  </label>
                </Form>
                <Table>
                  <TableHead>
                    <tr>
                      <th>User</th>
                      <th>Interest</th>
                      <th>Media</th>
                      <th>Box</th>
                      <th>Pullout</th>
                      <th>Distance</th>
                    </tr>
                  </TableHead>
                  <TableBody>
                    {
                      <tr>
                        <th>
                          <img src="http://placehold.it/200x200" alt="test" />
                          <div>
                            <p>Username</p>
                            <span>São Paulo / SP</span>
                          </div>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                      </tr>
                    }
                  </TableBody>
                </Table>
              </TabPanel>
            )}
            {selectedTab === "interested" && (
              <TabPanel>
                <Form>
                  <Label>
                    State
                    <Select>
                      <option value="NSW">New South Wales</option>
                      <option value="VIC">Victoria</option>
                      <option value="QLD">Queensland</option>
                      <option value="SA">South Australia</option>
                      <option value="WA">Western Australia</option>
                      <option value="TAS">Tasmania</option>
                      <option value="NT">Northern Territory</option>
                      <option value="ACT">Australian Capital Territory</option>
                    </Select>
                  </Label>
                  <label>
                    <input type="checkbox" /> Only those I follow
                  </label>
                </Form>
                <Table>
                  <TableHead>
                    <tr>
                      <th>User</th>
                      <th>Interest</th>
                      <th>Distance</th>
                    </tr>
                  </TableHead>
                  <TableBody>
                    {
                      <tr>
                        <th>
                          <img src="http://placehold.it/200x200" alt="test" />
                          <div>
                            <p>Username</p>
                            <span>São Paulo / SP</span>
                          </div>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                        <th>
                          <span>10</span>
                        </th>
                      </tr>
                    }
                  </TableBody>
                </Table>
              </TabPanel>
            )}
            {selectedTab === "datasheet" && (
              <TabPanel>
                <div>
                  <b>Release Date:</b>
                  <span>{formattedDate}</span>
                </div>
                <div>
                  <b>Producer:</b>
                  <span>{game.producer}</span>
                </div>
                <div>
                  <b>Distributor:</b>
                  <span>{game.producer}</span>
                </div>
                <div>
                  <b>Genre:</b>
                  <span>{game.genre}</span>
                </div>
                <div>
                  <b>Official Website:</b>
                  <Link to={game.official_link} target="_blank">
                    {game.producer}
                  </Link>
                </div>
              </TabPanel>
            )}
          </Tabs>
        </Card>
      </MainContainer>
    </Container>
  );
}
