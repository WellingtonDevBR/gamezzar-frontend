import { useLocation, useParams, useNavigate } from "react-router-dom";
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
import { getAxiosInstance } from "../../services/axios";
import Cookies from "js-cookie";
import {
  COVER_CONDITION,
  DISC_CONDITION,
  DISPOSITION,
  MANUAL_CONDITION,
} from "../../helper/constants";

type Option = {
  name: string;
  apiName?: string;
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

const satisfaction = [
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

const editions = [
  "Normal",
  "Greatest Hits",
  "Platinum",
  "Game of the Year",
  "Ultimate",
  "Collector's Edition",
  "Other Special Editions",
];

// These are the mapping functions for each selection:

export function AddGame() {
  const { register, handleSubmit } = useForm();
  const { state } = useLocation();
  const { id } = useParams();
  const game = state?.from;
  const newUser = state?.from;
  const token = Cookies.get("token");
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    navigate(0);
  }

  const onSubmit = async (data: any) => {
    data.region = regions[data.region];
    data.platform = platforms[data.platform];
    data.edition = editions[data.edition];
    console.log(data);
    const axios = getAxiosInstance(`${import.meta.env.VITE_BASE_URL}`);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post("/api/user-collection", {
      ...data,
      game_id: id,
    });

    if (response.status === 201) {
      navigate("/dashboard", { state: { tab: "Collection" } });
      navigate(0);
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <h1>I have this master piece!</h1>
      <Header>
        <GameDetails>
          <Image
            src={`${import.meta.env.VITE_S3_URL}/games/${
              newUser.image || game?.item?.image || game?.image
            }`}
            alt="ac-valhalla"
          />
          <h2>{game?.title}</h2>
        </GameDetails>
        <GameInfo>
          <div>
            {SelectItems({
              name: "Region",
              apiName: "region",
              arrayOptions: regions,
              defaultValue: game?.details?.region?.name || game?.region?.name,
              register,
            })}
          </div>
          <div>
            {SelectItems({
              name: "Platform",
              apiName: "platform",
              arrayOptions: platforms,
              defaultValue:
                game?.details?.platform?.name || game?.platform?.name,
              register,
            })}
          </div>
          <div>
            {SelectItems({
              name: "Game Edition",
              apiName: "edition",
              arrayOptions: editions,
              defaultValue: game?.details?.edition?.name || game?.edition?.name,
              register,
            })}
          </div>
        </GameInfo>
      </Header>
      <MainForm>
        <div>
          <p>Preferences</p>
          {SelectItems({
            name: "Distribution",
            apiName: "disposition",
            arrayOptions: DISPOSITION,
            defaultValue: game?.disposition || game?.inventory?.disposition,
            register,
          })}
          {SelectItems({
            name: "Satisfaction",
            apiName: "satisfaction",
            arrayOptions: satisfaction,
            defaultValue: game?.disposition || game?.inventory?.disposition,
            register,
          })}
        </div>
        <div>
          <p>Condition</p>
          {SelectItems({
            name: "Disc Condition",
            apiName: "disc_condition",
            arrayOptions: DISC_CONDITION,
            defaultValue: game?.disc_condition || game?.inventory?.condition,
            register,
          })}
          {SelectItems({
            name: "Manual Condition",
            apiName: "manual_condition",
            arrayOptions: MANUAL_CONDITION,
            defaultValue:
              game?.manual_condition || game?.inventory?.manual_condition,
            register,
          })}
          {SelectItems({
            name: "Cover Condition",
            apiName: "cover_condition",
            arrayOptions: COVER_CONDITION,
            defaultValue:
              game?.cover_condition || game?.inventory?.cover_condition,
            register,
          })}
          <label>Describe your game`s condition</label>
          <textarea
            defaultValue={game?.inventory?.description || game?.description}
            placeholder="Observations"
            {...register("description")}
          />

          <Button type="submit">Conclude Editing</Button>
        </div>
      </MainForm>
    </Container>
  );
}

const SelectItems = ({
  name,
  apiName,
  arrayOptions,
  register,
  defaultValue,
}: Option & { defaultValue?: number }) => (
  <>
    <label>{name}</label>
    <SelectForm
      id={name}
      {...register(apiName || name)}
      defaultValue={defaultValue != null ? defaultValue : ""}
    >
      <option value="" disabled>
        Select an option
      </option>
      {arrayOptions.map((item: string, index: number) => (
        <option key={item} value={index}>
          {item}
        </option>
      ))}
    </SelectForm>
  </>
);
