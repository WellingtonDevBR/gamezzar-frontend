import { GameTitle, StyledGameCard, DispositionIndicator } from "./styles";

export function GameCard({ game, onGameClick }) {
  return (
    <StyledGameCard 
      style={{ backgroundImage: `url(${import.meta.env.VITE_S3_URL}/games/${game.image})` }}
      onClick={() => onGameClick(game)}
    >
      <GameTitle>{game.title}</GameTitle>
      <DispositionIndicator disposition={game.disposition} />
    </StyledGameCard>
  );
}
