import React from "react";
import { Login, Registration } from "./pages";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Background from "../public/image/back.png";
import "./App.less";
import Header from "./pages/Layout/Header.js";

const RoutePaths = {
  HOME: "/",
  LOGIN: "/login",
  REGISTRATION: "/registration",
};
const App = () => {
  const routes = [
    {
      path: RoutePaths.HOME,
      component: Registration,
    },
    {
      path: RoutePaths.LOGIN,
      component: Login,
    },
    {
      path: RoutePaths.REGISTRATION,
      component: Registration,
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
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.path !== RoutePaths.LOGIN ? (
                    <>
                      <div className="App-container">
                        <Header />
                        <div className="App-container-body">
                          <route.component />
                        </div>
                      </div>
                    </>
                  ) : (
                    <route.component />
                  )
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
