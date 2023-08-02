import { NavLink } from "react-router-dom";
import {
  TopTrendingCardContent,
  TopTrendingCardImage,
  TopTrendingCard,
  TopTrendingCardPhoto,
  CardTitle,
} from "./styles";
import { ICardData } from "./utils";

export interface TrendingCardProps {
  item: ICardData;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({ item }) => (
  <TopTrendingCard>
    <NavLink style={{ all: "unset" }} to={`/game/${item.gameId}`}>
      <TopTrendingCardContent>
        <TopTrendingCardImage>
          <img src={item.imageUrl} alt="avatar" />
        </TopTrendingCardImage>
        <TopTrendingCardPhoto>
          <CardTitle>{item.title}</CardTitle>
        </TopTrendingCardPhoto>
      </TopTrendingCardContent>
    </NavLink>
  </TopTrendingCard>
);
