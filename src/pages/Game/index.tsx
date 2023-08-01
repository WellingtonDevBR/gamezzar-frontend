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
  LoadingSpinner, // Assuming this component exists in your project
} from "./styles";
import { useState, useEffect } from "react";
import { StyledChartComponent } from "../../helper/chart";
import { getAxiosInstance } from "../../services/axios";
import { convertTimeFormat } from "../../helper/convertTimeFormat";
import Cookies from "js-cookie";
import axios, { CancelTokenSource } from "axios";
import {
  satisfactionMapping,
  dispositionMapping,
  coverConditionMapping,
  discConditionMapping,
  manualConditionMapping,
} from "../../helper/constants";
import { getCityAndState } from "../../helper/cityState";
import { StyledNavLink } from "../../components/Header/styles";

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

interface RouteParams {
  id: string;
}

export function Game() {
  const initialGame: GameProps = {
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
  };

  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState<GameProps>(initialGame);
  const [gameOwners, setGameOwners] = useState<any[]>([]);
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [wishGame, setWishGame] = useState(null);
  const [hasProduct, setHasProduct] = useState(false);
  const [selectedTab, setSelectedTab] = useState("owners");
  const { id } = useParams<any>();
  const token = Cookies.get("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const axiosInstance = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    const token = Cookies.get("token");
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const gameResponse = await axiosInstance.get(`/api/game/${id}`);
      const gameData = gameResponse.data.game;
      const owners = gameResponse.data.owners;

      let userAddress = "";
      if (token) {
        setLoading(true);
        const response = await axiosInstance.get(`/api/wishlist/${id}`);
        setWishGame(response.data);

        const userDetailsResponse = await axiosInstance.get(
          "/api/user/details"
        );
        userAddress = userDetailsResponse.data.address.address;
      }

      setAddress(userAddress);
      setGame(gameData);
      setGameOwners(owners);

      if (owners.length > 0 && userAddress !== "") {
        await handleCompareLocations(
          userAddress,
          owners[0].user.address.address
        );
      }

      if (token) {
        try {
          const collectionResponse = await axiosInstance.get(
            `/api/user-collection/has-collection/${id}`
          );
          if (collectionResponse.status === 200) {
            setHasProduct(true);
          }
        } catch (error) {
          console.error(error);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCompareLocations = async (
    originAddress: string,
    destinationAddress: string
  ) => {
    const axiosInstance = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    const response = await axiosInstance.get(
      `/api/user/compare-locations/${originAddress}/${destinationAddress}`
    );
    setDistance(response?.data?.distance?.text);
  };

  const formattedDate = convertTimeFormat(game.release_date);

  if (loading) {
    return <LoadingSpinner />; // Display loading spinner while fetching data
  }

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
            ) : wishGame ? (
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
            ) : token ? (
              <>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: `/user/wishlist/edit/${id}`,
                  }}
                  state={{
                    from: {
                      title: game.title,
                      image: game.image,
                    },
                  }}
                >
                  <Button backgroundColor={"#9b4545"}>I want</Button>
                </NavLink>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: `/game/add/${id}`,
                  }}
                  state={{
                    from: {
                      title: game.title,
                      image: game.image,
                    },
                  }}
                >
                  <Button backgroundColor={"#2d5f2d"}>I have</Button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink style={{ textDecoration: "none" }} to="/login">
                  <Button backgroundColor={"#9b4545"}>I want</Button>
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/login">
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
                      <th>Game Review</th>
                      <th>Disc Condition</th>
                      <th>Cover Condition</th>
                      <th>Manual Condition</th>
                      <th>Distance</th>
                    </tr>
                  </TableHead>
                  <TableBody>
                    {gameOwners?.map((owner, index) => {
                      return (
                        <tr key={index}>
                          <th>
                            <img
                              src={`${import.meta.env.VITE_S3_URL}/avatar/${
                                owner.user.avatar
                              }`}
                              alt="test"
                            />
                            <div>
                              <p>{owner.user.user_name}</p>
                              <span>
                                {getCityAndState(owner.user?.address?.address)}
                              </span>
                            </div>
                          </th>
                          <th>
                            <span>
                              <SignalImage
                                code={
                                  satisfactionMapping(owner.satisfaction) - 1
                                }
                                src={`${
                                  import.meta.env.VITE_S3_URL
                                }/gauge/signal${
                                  satisfactionMapping(owner.satisfaction) - 1
                                }.svg`}
                                alt="test"
                              />
                            </span>
                          </th>
                          <th>
                            <span>
                              <SignalImage
                                code={
                                  discConditionMapping(owner.disc_condition) - 1
                                }
                                src={`${
                                  import.meta.env.VITE_S3_URL
                                }/gauge/signal${
                                  discConditionMapping(owner.disc_condition) - 1
                                }.svg`}
                                alt="test"
                              />
                            </span>
                          </th>
                          <th>
                            <span>
                              <SignalImage
                                code={
                                  coverConditionMapping(owner.cover_condition) -
                                  1
                                }
                                src={`${
                                  import.meta.env.VITE_S3_URL
                                }/gauge/signal${
                                  coverConditionMapping(owner.cover_condition) -
                                  1
                                }.svg`}
                                alt="test"
                              />
                            </span>
                          </th>
                          <th>
                            <span>
                              <SignalImage
                                code={
                                  manualConditionMapping(
                                    owner.manual_condition
                                  ) - 1
                                }
                                src={`${
                                  import.meta.env.VITE_S3_URL
                                }/gauge/signal${
                                  manualConditionMapping(
                                    owner.manual_condition
                                  ) - 1
                                }.svg`}
                                alt="test"
                              />
                            </span>
                          </th>
                          <th>
                            <span>
                              {!token ? (
                                <StyledNavLink to="/login">
                                  Need Login
                                </StyledNavLink>
                              ) : !address ? (
                                <StyledNavLink to="/dashboard">
                                  Add Address
                                </StyledNavLink>
                              ) : distance ? (
                                distance
                              ) : (
                                "Other's Address Unset"
                              )}
                            </span>
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
