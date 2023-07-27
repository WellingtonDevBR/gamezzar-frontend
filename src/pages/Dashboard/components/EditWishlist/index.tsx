import {
  Container,
  Header,
  Main,
  Section,
  Select,
  UpdateButton,
  RemoveButton,
} from "./styles";
import Cookies from "js-cookie";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { getAxiosInstance } from "../../../../services/axios";

export function EditWishlist() {
  const { handleSubmit, control } = useForm();
  const { id } = useParams();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    console.log(data);
    const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.put(`/api/wishlist/${id}/`, data);

    if (response.status === 200) {
      navigate("/dashboard");
    }
  };

  return (
    <Container>
      <Header>
        <h1>Edit your wishlist game</h1>
        <RemoveButton>Remove wishlist</RemoveButton>
      </Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Main>
          <img
            src="https://cdn.trocajogo.net/covers/ps5/0e68cd89-1782-4c9e-a8de-c5ac38669d0e.jpg"
            alt=""
          />
          <div>
            <h1>Game title</h1>
            <hr />
            <Section>
              <h3>Preferences</h3>
              <p>Como você descreveria a sua vontade em trocar esse jogo?</p>
              <Controller
                control={control}
                name="interest_level"
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field}>
                    <option value="">Selecione uma opção</option>
                    <option value="gauge1.svg">
                      Eu quero, mas ainda não estou muito certo sobre isso
                    </option>
                    <option value="gauge2.svg">
                      Só troco por um jogo sem muita importância para mim
                    </option>
                    <option value="gauge3.svg">
                      Estou disposto a trocá-lo por um bom jogo meu
                    </option>
                    <option value="gauge4.svg">
                      Quem sabe eu faria um sacrifício para ter esse jogo?
                    </option>
                    <option value="gauge5.svg">
                      Posso até me desfazer de um jogo que esteja empoeirando
                    </option>
                  </Select>
                )}
              />
            </Section>
          </div>
        </Main>
        <footer>
          <UpdateButton type="submit">Update</UpdateButton>
        </footer>
      </form>
    </Container>
  );
}
