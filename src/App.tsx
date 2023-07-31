import { GlobalStyle } from "./styles/global";
import { ThemeProvider } from "styled-components";
import { defaultTheme, theme } from "./styles/themes/default";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { AuthProvider } from "./context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { useContext } from "react";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
        <GlobalStyle />
      </ChakraProvider>
    </ThemeProvider>
  );
}
