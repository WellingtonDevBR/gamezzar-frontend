import { useForm } from "react-hook-form";
import {
  Container,
  MainContainer,
  InputForm,
  SelectForm,
  FormSubmitButton,
} from "./styles";
import Cookies from "js-cookie";
import { getAxiosInstance } from "../../../../services/axios";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import LoadingOverlay from "react-loading-overlay";

const platforms = [
  "Playstation 5",
  "Playstation 4",
  "Playstation 3",
  "Xbox One",
  "Xbox 360",
  "Wii U",
  "Wii",
  "Ps Vita",
  "Nitendo 3DS",
];

const platformMappings = {
  "Playstation 5": 5,
  "Playstation 4": 4,
  "Playstation 3": 3,
  "Xbox One": 1,
  "Xbox 360": 360,
  "Wii U": 1,
  Wii: 1,
  "Ps Vita": 1,
  "Nintendo 3DS": 3,
};

const regions = ["Oceania", "America", "Europe", "Asia"];

const regionMappings = {
  Oceania: 1,
  America: 2,
  Europe: 3,
  Asia: 4,
};

const PlatformSelect = ({ name, register }: any) => (
  <>
    <label>{name}</label>
    <SelectForm {...register(name.toLowerCase().replace(" ", ""))} id={name}>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </SelectForm>
  </>
);

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export function Preferences() {
  const [preferences, setPreferences] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast(); // for the toast message
  const [isLoading, setIsLoading] = useState(false);

  // New state for handling form submission success
  const [isSuccess, setIsSuccess] = useState(false);

  const token = Cookies.get("token");
  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get("/api/user/preferences");
        console.log(result.data);

        const transformedData = {
          status: result.data.status_message,
          shipment_type: {
            person: result.data.shipment_in_person,
            postal: result.data.shipment_postal,
            courier: result.data.shipment_courier,
          },
          notification_type: {
            site_emails: result.data.notification_site_emails,
            partner_emails: result.data.notification_partner_emails,
          },
          psn_id: result.data.playstation_network_id,
          xbox_id: result.data.xboxlive_gamertag,
        };

        platforms.forEach((platform) => {
          const platformKey = platform.toLowerCase().replace(" ", "");
          if (result.data[platformKey]) {
            transformedData[platformKey] = getKeyByValue(
              regionMappings,
              result.data[platformKey]
            );
          }
        });

        setPreferences(result.data);
        reset(transformedData); // reset form with the transformed data
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [import.meta.env.VITE_BASE_URL, reset]);

  const submitForm = async (data: any) => {
    setIsLoading(true);
    for (const platform of platforms) {
      const platformKey = platform.toLowerCase().replace(" ", "");
      if (data[platformKey] && regionMappings[data[platformKey]]) {
        data[platformKey] = regionMappings[data[platformKey]];
      }
    }

    try {
      const response = await axios.post("api/user/preferences", data);
      console.log("Success:", response.data);

      // Set the success state to true when submission is successful
      setIsSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success.",
        description: "Preferences were saved",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // The setTimeout gives the toast message a bit of time to display before the page reloads
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }, [isSuccess, toast]);

  return (
    <LoadingOverlay active={isLoading} spinner text="Loading...">
      <Container>
        <h1>Preferences</h1>
        <MainContainer>
          <form onSubmit={handleSubmit(submitForm)}>
            <h2>Status Message</h2>
            <textarea
              {...register("status")}
              id="status"
              cols={80}
              rows={10}
            ></textarea>

            <h2>Accept Trade</h2>
            <div>
              <input
                type="checkbox"
                {...register("shipment_type.person")}
                id="person"
                value="true"
              />
              <label htmlFor="person">In-person</label>
            </div>
            <div>
              <input
                type="checkbox"
                {...register("shipment_type.postal")}
                id="postal"
                value="true"
              />
              <label htmlFor="postal">Postal Service</label>
            </div>
            <div>
              <input
                type="checkbox"
                {...register("shipment_type.courier")}
                id="courier"
                value="true"
              />
              <label htmlFor="courier">Courier</label>
            </div>

            <h2>I want to receive notifications</h2>
            <div>
              <input
                type="checkbox"
                {...register("notification_type.site_emails")}
                id="site-emails"
                value="true"
              />
              <label htmlFor="site-emails">
                Receive other site notifications by email
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                {...register("notification_type.partner_emails")}
                id="partner-emails"
                value="true"
              />
              <label htmlFor="partner-emails">Receive partner emails</label>
            </div>

            <h2>Identification</h2>
            <label>PSN</label>
            <InputForm type="text" {...register("psn_id")} id="psn-user" />
            <label>Xbox</label>
            <InputForm type="text" {...register("xbox_id")} id="live-user" />

            <h2>My Platforms</h2>
            {platforms.map((platform) => (
              <PlatformSelect
                key={platform}
                name={platform}
                register={register}
              />
            ))}

            <FormSubmitButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <ClipLoader color="#ffffff" loading={isLoading} size={20} />
              ) : (
                "Update"
              )}
            </FormSubmitButton>
          </form>
        </MainContainer>
      </Container>
    </LoadingOverlay>
  );
}
