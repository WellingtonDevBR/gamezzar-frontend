import React, { FC, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  PageNav,
  Title,
  SubTitle,
  Container,
  LoginForm,
  Main,
  BtnContainer,
  Navlinks,
  Loginbtn,
} from "./styles";

interface FormValues {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const rememberRef = useRef<HTMLInputElement>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRememberMe = () => {
    if (rememberRef.current) {
      setRememberMe(rememberRef.current.checked);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
   
    const formData = {
      email: formValues.email,
      password: formValues.password,
      rememberMe: rememberMe,
    };
  
    try {
      const response = await fetch("https://addressr.p.rapidapi.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        
        const data = await response.json();
        console.log("Response Data:", data);
        
      } else {
        
        console.error("Form submission failed:", response.statusText);
        
      }
    } catch (error) {
      
      console.error("An error occurred:", error);
      
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

  const LoginClick = () => {
    // Add your logic for the "Submit" click here
    console.log("Submit clicked!");
  };

  return (
    <>
      <PageNav>
        <Title>Login</Title>
        <SubTitle>Home / Pages / Login</SubTitle>
      </PageNav>
      <Container>
        <h1>Login to Gamezzar</h1>
        <Main>
          <div>Login with Email</div>
          <BtnContainer>
            <button>
              <FontAwesomeIcon icon={faGoogle} /> Google
            </button>
            <button>
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </button>
          </BtnContainer>
        </Main>
        <div>Or Login with Email</div>
        <LoginForm onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your email Address"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <br />

          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <br />
          <div>
            <div className="RememberForgotContainer">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                ref={rememberRef}
                checked={rememberMe}
                onChange={handleRememberMe}
              />
              <Navlinks onClick={handleRememberMeClick}>Remember me</Navlinks>
              <br />
            </div>
            <div>
              <Navlinks onClick={handleForgotPasswordClick}>Forgot Password?</Navlinks>
              <br />
            </div>
          </div>
          <Loginbtn onClick={LoginClick}>Login</Loginbtn>
        </LoginForm>
      </Container>
    </>
  );
};

export default Login;
