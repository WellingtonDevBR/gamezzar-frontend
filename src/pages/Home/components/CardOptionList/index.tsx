import { GameController, Swap, Sword, User, IconProps } from "phosphor-react";
import { Container, CardOption } from "./styles";

export function CardOptionList() {
  const options: OptionProps[] = [
    {
      Icon: User,
      title: "Create an Account",
      description: "Create an account to start trading games and connecting with other gamers.",
      backgroundColor: "#5142FC",
    },
    {
      Icon: Sword,
      title: "Post Your Game",
      description: "Have a game you want to trade? Post it here to find interested traders.",
      backgroundColor: "#47A432",
    },
    {
      Icon: GameController,
      title: "Select a Game",
      description: "Browse through our extensive collection to find the next game you want to play.",
      backgroundColor: "#9835FB",
    },
    {
      Icon: Swap,
      title: "Trade Your Game",
      description: "Found a game you want? Initiate a trade with the owner to start playing!",
      backgroundColor: "#DF4949",
    }
  ];

  return (
    <Container>
      <h1>Let's get started</h1>
      <main>
        {options.map((option, index) => (
          <OptionCard key={index} {...option} />
        ))}
      </main>
    </Container>
  );
}


interface OptionProps {
  Icon: React.ComponentType<IconProps>;
  title: string;
  description: string;
  backgroundColor: string;
}

const OptionCard: React.FC<OptionProps> = ({ Icon, title, description, backgroundColor }) => (
  <CardOption backgroundColor={backgroundColor}>
    <div>
      <Icon size={28} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </CardOption>
);
