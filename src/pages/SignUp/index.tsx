import React, { FC, useState } from "react";
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

export const SignUp: FC = () => {
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
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Data construscted as request body through whatsapp example
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
          />

          <Input
            type="text"
            name="lastname"
            placeholder="Your Last Name"
            onChange={handleInputChange}
          />

          <Input
            type="text"
            name="username"
            placeholder="Your Username"
            onChange={handleInputChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Your Email Address"
            onChange={handleInputChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Your Password"
            onChange={handleInputChange}
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
      </Container>
    </>
  );
};
