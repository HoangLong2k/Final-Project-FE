import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  img#secImg {
    display: none;
    visibility: hidden;
  }
`;

export default GlobalStyle;
