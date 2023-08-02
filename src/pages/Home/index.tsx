import { Container } from "./styles";
import { TopTrending } from "./components/TopTrending";
import { PromoContent } from "./components/PromoContent";
import { TodaysDeals } from "./components/TodaysPicks";
import { PopularCollection } from "./components/PopularCollection";
import { CardOptionList } from "./components/CardOptionList";
import { getAxiosInstance } from "../../services/axios";
import { useState, useEffect } from "react";
import { TopSellers } from "./components/TopSeller";

export function Home() {
  const [games, setGames] = useState<any[]>([]);
  const [topVendors, setTopVendors] = useState<any[]>([]);
  const [userCollections, setUserCollections] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
        const gamesReponse = await axios.get("/api/game/get-all");
        setGames(gamesReponse.data);

        const usersCollectionResponse = await axios.get(
          "/api/user-collection/"
        );
        setUserCollections(usersCollectionResponse.data);

        const topVendorsResponse = await axios.get("/api/user/top-vendors");
        setTopVendors(topVendorsResponse.data);
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
      <PopularCollection />
      <CardOptionList />
    </Container>
  );
}
