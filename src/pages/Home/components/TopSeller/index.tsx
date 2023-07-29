// index.tsx

import { TopSellersCard, Container, TopSellerProfile } from "./styles";
import { NavLink } from "react-router-dom";

// Top Sellers Section
export function TopSellers({ users }: any) {
  const productCardWidth = 85 + 1.7 * 2; // Width of the image + 2 * gap
  const containerWidth = 800; // Max width of the container

  const productsPerRow = Math.floor(containerWidth / productCardWidth);
  const displayedUsers = users.slice(0, productsPerRow);

  return (
    <Container>
      <h1>Top Sellers</h1>
      <TopSellersCard>
        {displayedUsers.map((user: any) => (
          <NavLink
            style={{ all: "unset" }}
            to={`/profile/${user.user_name}`}
          >
            <TopSellerProfile key={user.user_id}>
              <img
                src={`${import.meta.env.VITE_S3_URL}/avatar/${
                  user.avatar
                }`}
                alt="avatar"
              />
              <p>{user.user_name}</p>
            </TopSellerProfile>
          </NavLink>
        ))}
      </TopSellersCard>
    </Container>
  );
}
