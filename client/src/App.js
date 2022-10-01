import React from "react";
import { Login } from "./pages";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Background from "../public/image/back.png";
import "./App.less";

const RoutePaths = {
  HOME: "/",
  LOGIN: "/login",
};
const App = () => {
  const routes = [
    {
      path: RoutePaths.HOME,
      component: Login,
    },
    {
      path: RoutePaths.LOGIN,
      component: Login,
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
                element={<route.component />}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
