import { Container } from "./styles";
import { PromoContent } from "./components/PromoContent";
import { TodaysDeals } from "./components/TodaysPicks";
import { PopularCollection } from "./components/PopularCollection";
import { CardOptionList } from "./components/CardOptionList";
import { getAxiosInstance } from "../../services/axios";
import { useState, useEffect } from "react";
import { TopSellers } from "./components/TopSeller";
import Cookies from "js-cookie";
import { TopTrending } from "./components/TopTrending";

export function Home() {
  const [games, setGames] = useState<any[]>([]);
  const [topVendors, setTopVendors] = useState<any[]>([]);
  const [userCollections, setUserCollections] = useState<any[]>([]);
  const [userPopularCollections, setUserPopularCollections] = useState<any[]>(
    []
  );
  const [offset, setOffset] = useState(0);
  const token = Cookies.get("token");
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  useEffect(() => {
    document.title = "Home | Gamezzar";
    const fetchData = async () => {
      try {
        const gamesReponse = await axios.get("/api/game/get-all");
        setGames(gamesReponse.data);

        const usersCollectionResponse = await axios.get(
          `/api/user-collection/?offset=${offset}`
        );
        setUserCollections(usersCollectionResponse.data);

        const topVendorsResponse = await axios.get("/api/user/top-vendors");
        setTopVendors(topVendorsResponse.data);

        const popularUserCollections = await axios.get(
          "/api/user-collection/popular"
        );
        setUserPopularCollections(popularUserCollections.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <PromoContent />
      <TopTrending games={games} />
      <TopSellers users={topVendors} />
      <TodaysDeals usersCollection={userCollections} />
      <PopularCollection userPopularCollections={userPopularCollections} />
      <CardOptionList />
    </Container>
  );
}
