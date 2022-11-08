import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Login, Registration, Qr, Admin, Dashboard } from "./pages";
import Header from "./pages/Layout/Header.js";

import Background from "../public/image/back.png";
import { RoutePaths } from "./utils/constant";
import "./App.less";

const App = () => {
  const islogin = JSON.parse(localStorage.getItem("username") || "{}");

  const routes = [
    {
      path: RoutePaths.REGISTRATION,
      component: Registration,
    },
    {
      path: RoutePaths.QR,
      component: Qr,
    },
    {
      path: RoutePaths.LOGIN,
      component: Login,
    },
    {
      path: RoutePaths.ADMIN,
      component: Admin,
    },
    {
      path: RoutePaths.DASHBOARD,
      component: Dashboard,
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
                      {route.path !== RoutePaths.LOGIN && <Header />}
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
