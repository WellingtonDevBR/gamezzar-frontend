import { useLocation } from "react-router-dom";
import {
  Container,
  Image,
  Header,
  SelectForm,
  GameDetails,
  GameInfo,
  MainForm,
  Button,
} from "./styles";
import { useForm } from "react-hook-form";

type Option = {
  name: string;
  arrayOptions: string[];
  register: ReturnType<typeof useForm>["register"];
};

const regions = ["America", "Europe", "Asia", "Oceania"];
const platforms = [
  "Playstation 5",
  "Playstation 4",
  "Playstation 3",
  "Xbox One",
  "Xbox 360",
  "Wii U",
  "Wii",
  "Ps Vita",
  "Nintendo 3DS",
];

const preferences = [
  "My version is digital",
  "Game available only for exhibition",
  "I don't trade, I prefer to see it collecting dust on the shelf",
  "You'll need to sweat to convince me to trade it",
  "If a good proposal comes up, I trade",
  "I want to trade anyway",
  "I will consider offers with affection",
];

const optionAboutTheGame = [
  "Unbearable",
  "Sufferable",
  "Horrible",
  "Bad",
  "Mediocre",
  "Okay",
  "Good",
  "Great",
  "Incredible",
  "Work of Art",
];

const media = [
  "Chipped or cracked media",
  "Significant scratches",
  "Many small scratches",
  "Few small scratches",
  "Only fingerprints",
  "No scratches or fingerprints",
];

const manual = [
  "No manual",
  "Tears, scratches or missing pages",
  "Significant damage",
  "Small dents",
  "Colors faded by light",
  "Only fingerprints",
  "No scratches or fingerprints",
  "Sealed game",
];

const box = [
  "No box and no cover",
  "Only cover (with damage)",
  "Only cover (no damage)",
  "Significant damage",
  "Small scratches",
  "Only fingerprints",
  "No scratches or cracks",
  "Sealed game",
];

export function AddGame() {
  const { register, handleSubmit } = useForm();
  const { state } = useLocation();
  const game = state.from;

  const onSubmit = (data: any) => {
    console.log(data);
    // Here you can handle the submission of your form
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <h1>I have this master piece!</h1>
      <Header>
        <GameDetails>
          <Image
            src={`${import.meta.env.VITE_S3_URL}/games/${game.image}`}
            alt="ac-valhalla"
          />
          <h2>The Callisto Protocol</h2>
        </GameDetails>
        <GameInfo>
          <div>
            {SelectItems({ name: "Region", arrayOptions: regions, register })}
          </div>
          <div>
            {SelectItems({
              name: "Platform",
              arrayOptions: platforms,
              register,
            })}
          </div>
        </GameInfo>
      </Header>
      <MainForm>
        <div>
          <p>Preferences</p>
          {SelectItems({
            name: "Preference",
            arrayOptions: preferences,
            register,
          })}
          {SelectItems({
            name: "Opinion",
            arrayOptions: optionAboutTheGame,
            register,
          })}
        </div>
        <div>
          <p>Condition</p>
          {SelectItems({ name: "Media", arrayOptions: media, register })}
          {SelectItems({ name: "Manual", arrayOptions: manual, register })}
          {SelectItems({ name: "Box", arrayOptions: box, register })}
          <label>Describe your game state</label>
          <textarea
            id="Observations"
            placeholder="Observations"
            {...register("Observations")}
          />

          <Button type="submit">Conclude Editing</Button>
        </div>
      </MainForm>
    </Container>
  );
}

const SelectItems = ({ name, arrayOptions, register }: Option) => (
  <>
    <label>{name}</label>
    <SelectForm id={name} {...register(name)}>
      <option value="" disabled selected>
        Select an option
      </option>
      {arrayOptions.map((item: string) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </SelectForm>
  </>
);
