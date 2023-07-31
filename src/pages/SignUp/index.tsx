import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  PageNav,
  Title,
  SubTitle,
  Container,
  LoginForm,
  SocialMediaContainer,
  LoginFormOptions,
  SignUpbtn,
  Input,
} from "./styles";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if any required field is empty
    if (
      formValues.firstname.trim() === "" ||
      formValues.lastname.trim() === "" ||
      formValues.username.trim() === "" ||
      formValues.email.trim() === "" ||
      formValues.password.trim() === ""
    ) {
      setSignupStatus("error");
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

      if (response.status === 201) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 3600 seconds * 1000 milliseconds = 1 hour
        Cookies.set("token", response.data.token, { expires: expirationDate });

        setToken(response.data.token);
        navigate("/");
        navigate(0);
      } else {
        setSignupStatus("error");
        console.log("Signup failed!");
      }
    } catch (error) {
      console.error("Error occurred during signup:", error);
    }
  };

  const handleRememberMeClick = () => {
    console.log("Remember me clicked!");
  };

  const handleForgotPasswordClick = () => {
    console.log("Forgot Password clicked!");
  };

  return (
    <>
      <PageNav>
        <Title>Sign Up</Title>
        <SubTitle>Home / Pages / Signup</SubTitle>
      </PageNav>
      <Container>
        <h1>Signup to Gamezzar</h1>

        <SocialMediaContainer>
          <span>Signup with Social Media</span>
          <section>
            <button>
              <FontAwesomeIcon icon={faGoogle} /> Google
            </button>

            <button>
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </button>
          </section>
        </SocialMediaContainer>

        <LoginForm onSubmit={handleSubmit}>
          <span>Or Signup with Email</span>
          <Input
            type="text"
            name="firstname"
            placeholder="Your First Name"
            onChange={handleInputChange}
            value={formValues.firstname}
          />

          <Input
            type="text"
            name="lastname"
            placeholder="Your Last Name"
            onChange={handleInputChange}
            value={formValues.lastname}
          />

          <Input
            type="text"
            name="username"
            placeholder="Your Username"
            onChange={handleInputChange}
            value={formValues.username}
          />

          <Input
            type="email"
            name="email"
            placeholder="Your Email Address"
            onChange={handleInputChange}
            value={formValues.email}
          />

          <Input
            type="password"
            name="password"
            placeholder="Your Password"
            onChange={handleInputChange}
            value={formValues.password}
          />
          <LoginFormOptions>
            <div>
              <input type="checkbox" name="remember" />
              <span onClick={handleRememberMeClick}>Remember me</span>
            </div>

            <div>
              <span onClick={handleForgotPasswordClick}>Forgot Password?</span>
            </div>
          </LoginFormOptions>

          <SignUpbtn type="submit">Signup </SignUpbtn>
        </LoginForm>

        {signupStatus === "error" && (
          <div style={{ color: "red" }}>
            Please fill in all required fields.
          </div>
        )}
      </Container>
    </>
  );
}
