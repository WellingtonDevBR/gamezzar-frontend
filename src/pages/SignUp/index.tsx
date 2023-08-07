import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Spinner,
  useToast,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { VStack } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { FormErrorMessage } from "@chakra-ui/react";

interface FormValues {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export function SignUp() {
  const initialFormValues: FormValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [signupStatus, setSignupStatus] = useState<string | null>(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let processedValue = value;

    if (name === "username") {
      // Remove leading numbers and replace spaces with hyphens
      processedValue = value.replace(/^[0-9]+/, "").replace(/\s/g, "-");

      // Limit length to 10 characters
      processedValue = processedValue.slice(0, 10);
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: processedValue,
    }));
  };

  const [formErrors, setFormErrors] = useState<{
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const errors: typeof formErrors = {};
    if (formValues.firstname.trim() === "")
      errors.firstname = "First name is required";
    if (formValues.lastname.trim() === "")
      errors.lastname = "Last name is required";
    if (formValues.username.trim() === "")
      errors.username = "Username is required";
    if (formValues.email.trim() === "") errors.email = "Email is required";
    if (formValues.password.trim() === "")
      errors.password = "Password is required";
    if (formValues.username.trim().length < 6)
      errors.username = "Username must be at least 6 characters";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSignupStatus("error");
      setIsLoading(false);
      return;
    }

    // Check if any required field is empty
    if (
      formValues.firstname.trim() === "" ||
      formValues.lastname.trim() === "" ||
      formValues.username.trim() === "" ||
      formValues.email.trim() === "" ||
      formValues.password.trim() === "" ||
      formValues.username.trim().length < 6 // Check if the username is less than 6 characters
    ) {
      setSignupStatus("error");
      setIsLoading(false);
      return;
    }

    try {
      // Data constructed as the request body through whatsapp example
      const formData = {
        first_name: formValues.firstname,
        last_name: formValues.lastname,
        user_name: formValues.username,
        email: formValues.email,
        password: formValues.password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/register`,
        formData
      );

      console.log(response);

      if (response.status === 201) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 3600 seconds * 1000 milliseconds = 1 hour
        Cookies.set("token", response.data.token, { expires: expirationDate });

        setToken(response.data.token);
        toast({
          title: "Account created.",
          description: "You have successfully signed up!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
        navigate(0);
      } else {
        toast({
          title: "Signup failed!",
          description: "Something went wrong. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setSignupStatus("error");
        console.log("Signup failed!");
      }
    } catch (error) {
      toast({
        title: "Error occurred during signup.",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error occurred during signup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRememberMeClick = () => {
    console.log("Remember me clicked!");
  };

  const handleForgotPasswordClick = () => {
    console.log("Forgot Password clicked!");
  };

  return (
    <Container>
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
              Signup
            </Heading>
            <Text>Home / Signup</Text>
          </VStack>
        </Flex>
      </VStack>

      <Box mt={6}>
        {/* <Box mt={4}>
          <Text align="center">Signup with Social Media</Text>
          <HStack spacing={10} justify="center">
            <Button
              leftIcon={<FontAwesomeIcon icon={faGoogle} />}
              colorScheme="purple"
              mt={2}
            >
              Google
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faFacebook} />}
              colorScheme="purple"
              mt={2}
            >
              Facebook
            </Button>
          </HStack>
        </Box> */}

        <form onSubmit={handleSubmit}>
          <FormControl mt={4} isInvalid={!!formErrors.firstname}>
            <FormLabel>Your First Name</FormLabel>
            <Input
              type="text"
              name="firstname"
              placeholder="Your First Name"
              onChange={handleInputChange}
              value={formValues.firstname}
            />
            {formErrors.firstname && (
              <FormErrorMessage>{formErrors.firstname}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isInvalid={!!formErrors.lastname}>
            <FormLabel>Your Last Name</FormLabel>
            <Input
              type="text"
              name="lastname"
              placeholder="Your Last Name"
              onChange={handleInputChange}
              value={formValues.lastname}
            />
            {formErrors.lastname && (
              <FormErrorMessage>{formErrors.lastname}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isInvalid={!!formErrors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              placeholder="Your Username"
              onChange={handleInputChange}
              value={formValues.username}
            />
            {formErrors.username && (
              <FormErrorMessage>{formErrors.username}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isInvalid={!!formErrors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Your Email Address"
              onChange={handleInputChange}
              value={formValues.email}
            />
            {formErrors.email && (
              <FormErrorMessage>{formErrors.email}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isInvalid={!!formErrors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Your Password"
              onChange={handleInputChange}
              value={formValues.password}
            />
            {formErrors.password && (
              <FormErrorMessage>{formErrors.password}</FormErrorMessage>
            )}
          </FormControl>

          <Box mt={4} d="flex" mb={20}>
            <HStack justifyContent="space-between">
              <Checkbox onClick={handleRememberMeClick}>Remember me</Checkbox>
              <Button
                type="submit"
                colorScheme="purple"
                mt={4}
                isLoading={isLoading}
                loadingText="Signing Up"
              >
                Signup
              </Button>
            </HStack>
          </Box>
        </form>

        {signupStatus === "error" && (
          <Text color="red" mt={4}>
            Please fill in all required fields.
          </Text>
        )}
      </Box>
    </Container>
  );
}
