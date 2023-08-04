import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  Select,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAxiosInstance } from "../../../../services/axios";
import LoadingOverlay from "react-loading-overlay";
import { regions } from "../../../../helper/constants";

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

// Some utility components to clean up our form
const FormSectionHeading = ({ children }) => (
  <Heading as="h2" size="md" mb={3}>
    {children}
  </Heading>
);

const FormCheckbox = ({ name, register, label }) => (
  <Checkbox {...register(name)} value="true">
    {label}
  </Checkbox>
);

// Let's also move the API calls to a separate function to clean up the useEffects
const fetchPreferences = async (setPreferences, reset, setIsLoading, axios) => {
  setIsLoading(true);
  try {
    const result = await axios.get("/api/user/preferences");
    console.log(result.data);
    const transformedData = transformPreferencesForForm(result.data);
    setPreferences(result.data);
    reset(transformedData);
    setIsLoading(false);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    setIsLoading(false);
  }
};

const transformPreferencesForForm = (preferences) => {
  const transformedData = {
    status: preferences.status_message,
    shipment_type: {
      person: preferences.shipment_in_person,
      postal: preferences.shipment_postal,
      courier: preferences.shipment_courier,
    },
    notification_type: {
      site_emails: preferences.notification_site_emails,
      partner_emails: preferences.notification_partner_emails,
    },
    psn_id: preferences.playstation_network_id,
    xbox_id: preferences.xboxlive_gamertag,
  };

  platforms.forEach((platform) => {
    const platformKey = platform.toLowerCase().replace(" ", "");
    if (preferences[platformKey]) {
      transformedData[platformKey] = getKeyByValue(
        regionMappings,
        preferences[platformKey]
      );
    }
  });

  return transformedData;
};

const regionMappings = {
  Oceania: 1,
  America: 2,
  Europe: 3,
  Asia: 4,
};

const PlatformSelect = ({ name, register }) => (
  <FormControl id={name}>
    <FormLabel>{name}</FormLabel>
    <Select {...register(name.toLowerCase().replace(" ", ""))}>
      {regions.map((region) => (
        <option style={{ background: "#5142FC" }} key={region} value={region}>
          {region}
        </option>
      ))}
    </Select>
  </FormControl>
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
    fetchPreferences(setPreferences, reset, setIsLoading, axios);
  }, [import.meta.env.VITE_BASE_URL, reset]);

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
      <Container maxW="container.xl" p={4} bg="blackAlpha.50" width="800px">
        <Heading as="h1" size="lg" mb={4}>
          Preferences
        </Heading>
        <Box p={4} borderRadius="md" boxShadow="sm" bg="blackAlpha.50">
          <form onSubmit={handleSubmit(submitForm)}>
            <VStack align="start" spacing={6}>
              <FormControl id="status">
                <FormLabel>Status Message</FormLabel>
                <Textarea p={5} {...register("status")} rows={10} />
              </FormControl>

              <FormSectionHeading>Accept Trade</FormSectionHeading>
              <FormCheckbox
                name="shipment_type.person"
                register={register}
                label="In-person"
              />
              <FormCheckbox
                name="shipment_type.postal"
                register={register}
                label="Postal Service"
              />
              <FormCheckbox
                name="shipment_type.courier"
                register={register}
                label="Courier"
              />

              <FormSectionHeading>
                I want to receive notifications
              </FormSectionHeading>
              <FormCheckbox
                name="notification_type.site_emails"
                register={register}
                label="Receive other site notifications by email"
              />
              <FormCheckbox
                name="notification_type.partner_emails"
                register={register}
                label="Receive partner emails"
              />

              <FormSectionHeading>Identification</FormSectionHeading>
              <FormControl id="psn-user">
                <FormLabel>PSN ID</FormLabel>
                <Input type="text" {...register("psn_id")} />
              </FormControl>
              <FormControl id="live-user">
                <FormLabel>Xbox ID</FormLabel>
                <Input type="text" {...register("xbox_id")} />
              </FormControl>

              <FormSectionHeading>My Platforms</FormSectionHeading>
              {platforms.map((platform) => (
                <PlatformSelect
                  key={platform}
                  name={platform}
                  register={register}
                />
              ))}
              <Button
                w="100%"
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
              >
                Update
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </LoadingOverlay>
  );
}
