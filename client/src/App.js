import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import { Login, Registration } from "./pages";
import Header from "./pages/Layout/Header.js";

import Background from "../public/image/back.png";
import { RoutePaths } from "./utils/constant";
import "./App.less";

const App = () => {
  const islogin = useSelector(({ user }) => {
    return user.islogin;
  });

  const routes = [
    {
      path: RoutePaths.REGISTRATION,
      component: Registration,
      index: false,
    },
    {
      path: RoutePaths.QR,
      component: Login,
      index: false,
    },
  ];

  return (
    <div className="App">
      <div className="App-background">
        <img
          src={Background}
          className="App-background-image"
          alt="background"
        />
      </div>
      <BrowserRouter>
        {islogin ? (
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  index={route.index}
                  key={route.path}
                  path={route.path}
                  element={
                    <div className="App-container">
                      <Header />
                      <div className="App-container-body">
                        <route.component />
                      </div>
                    </div>
                  }
                />
              );
            })}
          </Routes>
        ) : (
          <div className="App-container">
            <Login />
          </div>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
