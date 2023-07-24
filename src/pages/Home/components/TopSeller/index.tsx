// index.tsx

import { TopSellersCard, Container, TopSellerProfile } from "./styles";
import { TopTrendingProps } from "../TopTrending";

// Top Sellers Section
export function TopSellers({ products }: TopTrendingProps) {
  const productCardWidth = 85 + 1.7 * 2; // Width of the image + 2 * gap
  const containerWidth = 800; // Max width of the container

  const productsPerRow = Math.floor(containerWidth / productCardWidth);
  const displayedProducts = products.slice(0, productsPerRow);

  return (
    <Container>
      <h3>Top Sellers</h3>
      <TopSellersCard>
        {displayedProducts.map((product) => (
          <TopSellerProfile key={product.user.user_id}>
            <img
              src={`${import.meta.env.VITE_S3_URL}/avatar/${product.user.avatar}`}
              alt="avatar"
            />
            <p>{product.user.user_name}</p>
          </TopSellerProfile>
        ))}
      </TopSellersCard>
    </Container>
  );
}
