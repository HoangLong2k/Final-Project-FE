import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Loading from "./pages/Loading";
import App from "./App";
import store from "./stores";

import GlobalStyle from "./global-style";
import "./index.less";

const ROOT = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Loading />
      <App />
      <GlobalStyle />
    </Provider>
  </React.StrictMode>,
  ROOT
);
