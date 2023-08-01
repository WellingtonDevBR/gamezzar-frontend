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
import {
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { getAxiosInstance } from "../../../../services/axios";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";

export function EditWishlist() {
  const { handleSubmit, control } = useForm();
  const { id } = useParams();
  const { state } = useLocation();
  const game = state?.from;
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the toast hook
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(`/api/wishlist/${id}/`);
      setWishlist(response.data);
    }
    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(`/api/wishlist/`, {
      interest_level: data.interest_level,
      game_id: id,
    });

    if (response.status === 201) {
      setIsLoading(false);
      // Show the toaster notification for success
      toast({
        title: "Success.",
        description: "Wishlist game updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/dashboard", { state: { tab: "Wishlist" } });
      navigate(0);
    } else {
      setIsLoading(false);
      // Show the toaster notification for error
      toast({
        title: "Error.",
        description: "Failed to update wishlist game.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onDelete = async (wishlistId: string) => {
    setIsLoading(true);
    const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await axios.delete(`/api/wishlist/${wishlistId}/`);

      if (response.status === 200) {
        setIsLoading(false);
        // Show the toaster notification for success
        toast({
          title: "Success.",
          description: "Wishlist game removed.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/dashboard", { state: { tab: "Wishlist" } });
        navigate(0);
      }
    } catch (error) {
      setIsLoading(false);
      // Show the toaster notification for error
      toast({
        title: "Error.",
        description: "Failed to remove wishlist game.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  console.log(game);

  return (
    <Container>
      <Header>
        <h1>Edit your wishlist game</h1>
        <RemoveButton
          onClick={() => onDelete(wishlist.wishlist_id)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={20} />
          ) : (
            "Remove wishlist"
          )}
        </RemoveButton>
      </Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Main>
          <img
            src={`${import.meta.env.VITE_S3_URL}/games/${
              wishlist?.details?.image ? wishlist?.details?.image : game?.image
            }`}
            alt=""
          />
          <div>
            <h1>
              {wishlist?.details?.title
                ? wishlist?.details?.title
                : game?.title}
            </h1>
            <hr />
            <Section>
              <h3>Preferences</h3>
              <p>How would you describe your willingness to trade this game?</p>
              <Controller
                control={control}
                name="interest_level"
                rules={{ required: true }}
                defaultValue={wishlist?.interest_level}
                render={({ field }) => (
                  <select {...field}>
                    <option value="">Select an option</option>
                    <option value="gauge1.svg">
                      I want it, but I'm not quite sure yet
                    </option>
                    <option value="gauge2.svg">
                      I'll only trade it for a game of little importance to me
                    </option>
                    <option value="gauge3.svg">
                      I'm willing to trade it for a good game of mine
                    </option>
                    <option value="gauge4.svg">
                      I might even make a sacrifice to have this game
                    </option>
                    <option value="gauge5.svg">
                      I can part ways with a game that's just gathering dust
                    </option>
                  </select>
                )}
              />
            </Section>
          </div>
        </Main>
        <footer>
          <UpdateButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : wishlist ? (
              "Update wishlist"
            ) : (
              "Add to wishlist"
            )}
          </UpdateButton>
        </footer>
      </form>
    </Container>
  );
}
