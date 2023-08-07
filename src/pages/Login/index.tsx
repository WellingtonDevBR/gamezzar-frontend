import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Heading,
  VStack,
  HStack,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface FormValues {
  email: string;
  password: string;
}

export function SignIn() {
  const initialFormValues: FormValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [signinStatus, setSigninStatus] = useState<string | null>(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const errors: typeof formErrors = {};
    if (formValues.email.trim() === "") errors.email = "Email is required";
    if (formValues.password.trim() === "")
      errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSigninStatus("error");
      setIsLoading(false);
      return;
    }

    try {
      const formData = {
        email: formValues.email,
        password: formValues.password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/login`,
        formData
      );

      if (response.status === 200) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour
        Cookies.set("token", response.data.token, { expires: expirationDate });

        setToken(response.data.token);
        toast({
          title: "Logged in.",
          description: "You have successfully signed in!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
        navigate(0)
      } else {
        toast({
          title: "Sign-in failed!",
          description: "Something went wrong. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setSigninStatus("error");
      }
    } catch (error) {
      toast({
        title: "Error occurred during sign-in.",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error occurred during sign-in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <VStack spacing={4}>
        <Flex justifyContent="center" alignItems="center" bg="gray" w="100%" h="150px">
          <VStack>
            <Heading as="h1" size="lg">
              Signin
            </Heading>
            <Text>Home / Signin</Text>
          </VStack>
        </Flex>
      </VStack>

      <Box mt={6}>
        <form onSubmit={handleSubmit}>
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
              <Button onClick={() => console.log("Forgot Password clicked!")}>Forgot Password</Button>
              <Button
                type="submit"
                colorScheme="purple"
                mt={4}
                isLoading={isLoading}
                loadingText="Signing In"
              >
                Signin
              </Button>
            </HStack>
          </Box>
        </form>

        {signinStatus === "error" && (
          <Text color="red" mt={4}>
            Please fill in all required fields.
          </Text>
        )}
      </Box>
    </Container>
  );
}
