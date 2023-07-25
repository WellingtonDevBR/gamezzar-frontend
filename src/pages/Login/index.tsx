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
import { getAxiosInstance } from "../../services/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import Cookies from 'js-cookie';

interface FormValues {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const rememberRef = useRef<HTMLInputElement>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setLoading(true);
  
    const axios = getAxiosInstance(import.meta.env.VITE_BASE_URL);
  
    try {
      const response = await axios.post("/api/users/login", {
        email: formValues.email,
        password: formValues.password,
      });
  
      if (response.status === 200) {
        // Set the token cookie to expire in one minute
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 60 * 1000); // 60 seconds * 1000 milliseconds = 1 minute
        Cookies.set('token', response.data.token, { expires: expirationDate });
  
        setToken(response.data.token);
        navigate("/dashboard");
      } else {
        toast.error("User not found or does not exist");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("An error occurred while trying to login");
      }
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
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
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
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
              <Navlinks onClick={handleForgotPasswordClick}>
                Forgot Password?
              </Navlinks>
              <br />
            </div>
          </div>
          <Loginbtn type="submit">
            {loading ? (
              <BeatLoader color={"#123abc"} loading={loading} size={15} />
            ) : (
              "Login"
            )}
          </Loginbtn>
        </LoginForm>
      </Container>
    </>
  );
};
