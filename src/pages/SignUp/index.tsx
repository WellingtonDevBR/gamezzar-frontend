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

interface FormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export const SignUp: FC = () => {
  const initialFormValues: FormValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [signupStatus, setSignupStatus] = useState<string | null>(null);

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
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        user_name: formValues.userName,
        email: formValues.email,
        password: formValues.password,
      };

      //  API request to the backend server for signup
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/signup`,
        formData
      );

      // Handle the server response
      if (response.status === 200) {
        // Signup successful, handle success
        setSignupStatus("success");
        console.log("Signup successful!");
        // make chnages to login
      } else {
        // Signup failed, handle error
        setSignupStatus("error");
        console.log("Signup failed!");
        // set error message
      }
    } catch (error) {
      console.error("Error occurred during signup:", error);
      // add code to handle error
    }
  };

  const handleRememberMeClick = () => {
    // Add your logic for the "Remember me" click here
    console.log("Remember me clicked!");
  };

  const handleForgotPasswordClick = () => {
    // Add your logic for the "Forgot Password" click here
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
            name="fname"
            placeholder="Your First Name"
            value={formValues.firstName}
            onChange={handleInputChange}
          />

          <Input
            type="text"
            name="lname"
            placeholder="Your Last Name"
            value={formValues.lastName}
            onChange={handleInputChange}
          />

          <Input
            type="text"
            name="Uname"
            placeholder="Your Username"
            value={formValues.userName}
            onChange={handleInputChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={formValues.email}
            onChange={handleInputChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formValues.password}
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
