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
  IsOwnerOrWishButton,
  SignalImage,
} from "./styles";
import { useState, useEffect } from "react";
import { StyledChartComponent } from "../../helper/chart";
import { getAxiosInstance } from "../../services/axios";
import { convertTimeFormat } from "../../helper/convertTimeFormat";
import Cookies from "js-cookie";

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
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const [selectedTab, setSelectedTab] = useState("owners");
  const token = Cookies.get("token");
  const [isWishGame, setIsWishGame] = useState(false);
  const [gameOwners, setGameOwners] = useState<any[]>();
  const [hasProduct, setHasProduct] = useState(false);
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

  console.log(gameOwners);

  const formattedDate = convertTimeFormat(game.release_date);
  let { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
      const gameResponse = await axios.get(`/api/game/${id}`);
      setGame(gameResponse.data.game);
      setGameOwners(gameResponse.data.owners);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const collectionResponse = await axios.get(
          `/api/user-collection/has-collection/${id}`
        );
        if (collectionResponse.status === 200) {
          setHasProduct(true);
        }
      }
    }
    fetchData();
    // window.scrollTo(0, 0);
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
          <ButtonContainer isOwner={hasProduct}>
            {hasProduct ? (
              <>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: `/game/add/${id}`,
                  }}
                  state={{ from: game }}
                >
                  <IsOwnerOrWishButton>Edit This Game</IsOwnerOrWishButton>
                </NavLink>
              </>
            ) : isWishGame ? (
              <>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: `/game/add/${id}`,
                  }}
                  state={{ from: gameOwners }}
                >
                  <IsOwnerOrWishButton>Edit Wish</IsOwnerOrWishButton>
                </NavLink>
              </>
            ) : !token ? (
              <>
                <NavLink style={{ textDecoration: "none" }} to="/login">
                  <Button backgroundColor={"#9b4545"}>I want</Button>
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/login">
                  <Button backgroundColor={"#2d5f2d"}>I have</Button>
                </NavLink>
              </>
            ) : (
              <>
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
              </>
            )}
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
                      <th>Enjoy</th>
                      <th>Disc</th>
                      <th>Case</th>
                      <th>Booklet</th>
                      <th>Distance</th>
                    </tr>
                  </TableHead>
                  <TableBody>
                    {gameOwners?.map((owner) => {
                      return (
                        <tr>
                          <th>
                            <img
                              src={`${import.meta.env.VITE_S3_URL}/avatar/${
                                owner.user.avatar
                              }`}
                              alt="test"
                            />
                            <div>
                              <p>{owner.user.user_name}</p>
                              <span>São Paulo / SP</span>
                            </div>
                          </th>
                          <th>
                            <span>
                              <SignalImage
                                code={owner.interest_level}
                                src={`${
                                  import.meta.env.VITE_S3_URL
                                }/gauge/signal${owner.interest_level}.svg`}
                                alt="test"
                              />
                            </span>
                          </th>
                          <th>
                            <span>
                              <SignalImage
                                code={owner.media_condition}
                                src={`${
                                  import.meta.env.VITE_S3_URL
                                }/gauge/signal${owner.media_condition}.svg`}
                                alt="test"
                              />
                            </span>
                          </th>
                          <th>
                            <span>
                              <SignalImage
                                code={owner.box_condition}
                                src={`${
                                  import.meta.env.VITE_S3_URL
                                }/gauge/signal${owner.box_condition}.svg`}
                                alt="test"
                              />
                            </span>
                          </th>
                          <th>
                            <span>
                              <SignalImage
                                code={owner.booklet_condition}
                                src={`${
                                  import.meta.env.VITE_S3_URL
                                }/gauge/signal${owner.booklet_condition}.svg`}
                                alt="test"
                              />
                            </span>
                          </th>
                          <th>
                            <span>12 km</span>
                          </th>
                        </tr>
                      );
                    })}
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
