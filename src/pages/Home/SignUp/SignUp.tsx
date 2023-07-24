

import {
  PageNav,
  Title,
  SubTitle,
  Container,
  LoginForm,
  Main,
  BtnContainer,
  Navlinks,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";

export function SignUp() {
  return (
    <>
      <PageNav>
        <Title>Sign Up</Title>
        <SubTitle>Home / Pages / Signup</SubTitle>
      </PageNav>
      <Container>
        <h1>Signup to Gamezzar</h1>
        <Main>
        <div>Login with Email</div>
        <BtnContainer>
        <button>  <FontAwesomeIcon icon={faGoogle} /> Google</button>
          <button>  <FontAwesomeIcon icon={faFacebook} /> Facebook</button>
        </BtnContainer>
      </Main>
      <div>Or Login with Email</div>
      <LoginForm>
        
        <input type="fname" id="fname" placeholder="Your First Name" />
        <br />
        <input type="lname" id="lname" placeholder="Your Last Name" />
        <br />
        <input type="Uname" id="Uname" placeholder="Your Usename" />
        <br />
      
        <input type="password" id="password" placeholder="Your Password" />
        <br />
        <div >
          <div className="RememberForgotContainer">
          <input type="checkbox" id="remember" />
          <Navlinks href="#">Remember me</Navlinks>
        <br /> 
          </div>
          <div>
          <Navlinks href="#">Forgot Password?</Navlinks>
        <br />
          </div>
        </div>
        <button type="submit">Login</button>
      </LoginForm>
      </Container>
     
    </>
  );
}
