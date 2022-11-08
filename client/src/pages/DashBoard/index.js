import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../utils/constant";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(RoutePaths.LOGIN);
  }, []);

  return <></>;
};

export default Dashboard;
