import React from "react";
import { Login, Registration } from "./pages";
import { Route, Routes, BrowserRouter } from "react-router-dom";
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
