import React, { useEffect, useState } from "react";
import {
  Input,
  VStack,
  Heading,
  Text,
  Box,
  Flex,
  Button,
  Container,
  FormControl,
  Image,
  Grid,
  GridItem,
  InputGroup,
  InputRightElement,
  AspectRatio,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";
import { getAxiosInstance } from "../../services/axios";
import { Link } from "react-router-dom";

interface FormValues {
  fullName: string;
  email: string;
  title: string;
  description: string;
  image: string;
  region: string;
  platform: string;
  officialLink: string;
}

export function CreateItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();
  const [formValues, setFormValues] = useState<FormValues>({
    fullName: "",
    email: "",
    title: "",
    description: "",
    image: "",
    region: "",
    platform: "",
    officialLink: "",
  });

  useEffect(() => {
    document.title = "Game Listing | Gamezzar";
  }, []);

  const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/listing/request", formValues);
      toast({
        title: "Request made successfully.",
        description: "We've received your request. We'll be in touch soon!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormValues({
        fullName: "",
        email: "",
        title: "",
        description: "",
        image: "",
        region: "",
        platform: "",
        officialLink: "",
      });
      setIsSuccess(true);
    } catch (err) {
      toast({
        title: "An error occurred.",
        description: "Unable to submit request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Flex justify="center" align="center" minH="100vh">
      <Spinner />
    </Flex>
  ) : isSuccess ? (
    <Container centerContent m="450px auto">
      <Heading>Thank You!</Heading>
      <Text>
        We have received your request. We'll be in touch via email soon!
      </Text>
      <Link to="/">
        <Button mt={10} bg="#5142FC">
          Go Back
        </Button>
      </Link>
    </Container>
  ) : (
    <Container maxW="6xl" mb={250}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Flex
            justifyContent="center"
            alignItems="center"
            bg="gray"
            w="100%"
            h="150px"
          >
            <VStack>
              <Heading as="h1" size="lg">
                Game Listing Form
              </Heading>
              <Text>Home / Pages / Listing</Text>
            </VStack>
          </Flex>

          <Grid templateColumns="4fr 1fr" gap={6}>
            <GridItem width="800px">
              <Heading size="sm" mb={1} mt={3}>
                Your Name
              </Heading>
              <Input
                name="fullName" // add name attribute
                placeholder="Game you wish us to be listed"
                value={formValues.fullName}
                onChange={handleInputChange}
              />

              <Heading size="sm" mb={1} mt={3}>
                Your Email
              </Heading>
              <Input
                type="email"
                name="email" // add name attribute
                placeholder="Game you wish us to be listed"
                value={formValues.email}
                onChange={handleInputChange}
              />

              <Heading size="sm" mb={1} mt={3}>
                Game Name
              </Heading>
              <Input
                name="title" // add name attribute
                placeholder="Game you wish us to be listed"
                value={formValues.title}
                onChange={handleInputChange}
              />

              <Heading size="sm" mb={1} mt={3}>
                Description
              </Heading>
              <Input
                name="description" // add name attribute
                placeholder="Relevant information about the product]"
                value={formValues.description}
                onChange={handleInputChange}
              />

              <Heading size="sm" mb={1} mt={3}>
                Official Website
              </Heading>
              <Input
                name="officialLink" // add name attribute
                placeholder="https://"
                value={formValues.officialLink}
                onChange={handleInputChange}
              />

              <Heading size="sm" mb={1} mt={3}>
                Platform
              </Heading>
              <Input
                name="platform" // add name attribute
                placeholder="e.g 'Playstation 4'"
                value={formValues.platform}
                onChange={handleInputChange}
              />

              <Heading size="sm" mb={1} mt={3}>
                Region
              </Heading>
              <Input
                name="region" // add name attribute
                placeholder="e.g. 'Oceania'"
                value={formValues.region}
                onChange={handleInputChange}
              />

              <Button mt={3} colorScheme="blue" type="submit">
                Submit
              </Button>
            </GridItem>

            <GridItem>
              <AspectRatio
                ratio={1}
                width="100%"
                borderColor="gray.200"
                borderWidth="2px"
                mt={10}
              >
                {formValues.image ? (
                  <Image
                    src={formValues.image}
                    alt="Uploaded game image"
                    objectFit="cover"
                  />
                ) : (
                  <Box />
                )}
              </AspectRatio>
              <FormControl mt={3}>
                <InputGroup>
                  <InputRightElement w="100%">
                    <Button
                      as="label"
                      htmlFor="file-upload"
                      size="sm"
                      colorScheme="teal"
                    >
                      <FaUpload />
                    </Button>
                    <Text ml="20px">Game Image</Text>
                  </InputRightElement>
                  <Input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </InputGroup>
              </FormControl>
            </GridItem>
          </Grid>
        </VStack>
      </form>
    </Container>
  );
}
