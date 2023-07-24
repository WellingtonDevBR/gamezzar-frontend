import { Container } from "./styles";
import { TopTrending } from "./components/TopTrending";
import { TopSellers } from "./components/TopSeller";
import { PromoContent } from "./components/PromoContent";
import { TodaysDeals } from "./components/TodaysPicks";
import { PopularCollection } from "./components/PopularCollection";
import { CardOptionList } from "./components/CardOptionList";
import { getAxiosInstance } from "../../services/axios";
import { BASE_URL } from "../../helper/constants";
import { useState, useEffect } from "react";

export function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axios = getAxiosInstance(BASE_URL);
        const result = await axios.get("/api/games/get-all");
        setProducts(result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <PromoContent />
      <section>
        <TopTrending products={products} />
        <TopSellers products={products} />
        <TodaysDeals products={products} />
        <PopularCollection />
        <CardOptionList />
      </section>
    </Container>
  );
}
