import React, { FC, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  PageNav,
  Title,
  SubTitle,
  Container,
  LoginForm,
  SocialMediaContainer,
  Loginbtn,
  LoginFormOptions,
  Input,
} from "./styles";
import { getAxiosInstance } from "../../services/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

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
      const response = await axios.post("/api/user/login", {
        email: formValues.email,
        password: formValues.password,
      });

      if (response.status === 200) {
        // Set the token cookie to expire in one minute
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 1000 * 10 * 10 * 10); // 600 seconds * 1000 milliseconds = 1 minute
        Cookies.set("token", response.data.token, { expires: expirationDate });

        setToken(response.data.token);
        navigate("/");
        navigate(0);
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

        <SocialMediaContainer>
          <span>Login with Social Media </span>
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
          <span>Or Login with Email</span>
          <Input
            type="email"
            name="email"
            placeholder="Your email Address"
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
              <input
                type="checkbox"
                name="remember"
                ref={rememberRef}
                checked={rememberMe}
                onChange={handleRememberMe}
              />

              <span onClick={handleRememberMeClick}>Remember me</span>
            </div>

            <div>
              <span onClick={handleForgotPasswordClick}>Forgot Password?</span>
            </div>
          </LoginFormOptions>

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
