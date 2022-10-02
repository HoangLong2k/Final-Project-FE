import React, { useState } from "react";
import { Typography } from "antd";

import "./styles.less";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Header = () => {
  const [active, setActive] = useState(!null);
  const navigate = useNavigate();
  const NAVBAR = [
    {
      title: "Registration",
      path: "/registration",
    },
    {
      title: "QR",
      path: "/registration",
    },
  ];
  return (
    <div className="header-container">
      <div className="left">
        <Title
          className="card-title"
          level={2}
          style={{ color: "rgb(255 255 255)" }}
        >
          My WareHouse
        </Title>
      </div>
      <div className="right">
        {NAVBAR.map((item, index) => {
          return (
            <div
              key={index}
              className={`card-header ${active === item.title ? "active" : ""}`}
              onClick={() => {
                setActive(item.title);
                navigate({ pathname: item.path });
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
