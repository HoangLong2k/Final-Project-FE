import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./stores";
import GlobalStyle from "./global-style";

import "./index.less";

const ROOT = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <GlobalStyle />
    </Provider>
  </React.StrictMode>,
  ROOT
);
