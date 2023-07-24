import { CardTitle } from "../TodaysPicks/styles";
import {
  TopTrendingCardContent,
  TopTrendingCardImage,
  TopTrendingCard,
  TopTrendingCardPhoto,
} from "./styles";
import { ICardData } from "./utils";

export interface TrendingCardProps {
  item: ICardData;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({ item }) => (
  <TopTrendingCard>
    <TopTrendingCardContent>
      <TopTrendingCardImage>
        <img src={item.imageUrl} alt="avatar" />
      </TopTrendingCardImage>
      <TopTrendingCardPhoto>
        <CardTitle>{item.title}</CardTitle>
      </TopTrendingCardPhoto>
    </TopTrendingCardContent>
  </TopTrendingCard>
);
