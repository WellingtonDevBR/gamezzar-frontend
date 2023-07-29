import { createGlobalStyle } from "styled-components";

export const GlobalStyle: any = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
    }

    body {
        background-color: var(--white);
        font-family: 'Urbanist', sans-serif;
        -webkit-font-smoothing: antialiased;
        background: rgb(12,7,27);
        background: linear-gradient(24deg, rgba(12,7,27,1) 0%, rgba(21,6,69,1) 19%, rgba(3,1,9,1) 54%, rgba(6,3,47,1) 100%);
        color: #fff;
    }

    body, input, textarea, button {
        font-family: 'Urbanist', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        border: none;
    }
`;
