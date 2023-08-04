import { extendTheme } from "@chakra-ui/react";

export const defaultTheme = {
  "--background-color": "#14141F",
  white: "#FFFFFF",

  "--primary": "#5142FC",
  "--done": "#47A432",
  "--warning": "#FFBD0C",
  "--critical": "#DF4949",
  "--surface": "#FFFFFF",
  "--secondary": "#EBEBEB",
};

export const theme = extendTheme({
  colors: {
    purple: {
      50: "#F5F3FF",
      100: "#ECE9FE",
    },
    background: "#14141F",
    white: "#FFFFFF",
    primary: "#5142FC",
    done: "#47A432",
    warning: "#FFBD0C",
    critical: "#DF4949",
    surface: "#FFFFFF",
    secondary: "#EBEBEB",
  },
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "purple.500",
      color: "purple.500",
    },
    solid: {
      bg: "purple.500",
      color: "white",
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "outline",
  },
  shadows: {
    purple: "0 0 0 3px rgba(159, 122, 234, 0.6)",
  },
  fonts: {
    body: "'Urbanist', sans-serif",
    heading: "'Urbanist', sans-serif",
    mono: "'Urbanist', sans-serif",
  },
  styles: {
    global: {
      "*": {
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
      },
      body: {
        background:
          "linear-gradient(24deg, rgba(12,7,27,1) 0%, rgba(21,6,69,1) 19%, rgba(3,1,9,1) 54%, rgba(6,3,47,1) 100%)",
        fontFamily: "Urbanist, sans-serif",
        fontSmooth: "always",
        WebkitFontSmoothing: "antialiased",
        color: "#fff",
      },
      ":focus": {
        outline: "0",
      },
    },
  },
});
