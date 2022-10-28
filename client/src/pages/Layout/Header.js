import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getDataSubmitted } from "../../stores/user";

import "./styles.less";

const { Title } = Typography;

const Header = () => {
  const [active, setActive] = useState("Registration");
  const [role, setRole] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const NAVBAR = [
    {
      title: "Registration",
      path: "/registration",
      role: "user",
    },
    {
      title: "QR",
      path: "/qr",
      role: "user",
    },
    {
      title: "Admin",
      path: "/admin",
      role: "admin",
    },
  ];

  const dataSubmitted = useSelector(({ user }) => {
    return user.dataSubmitted;
  });

  useEffect(() => {
    setRole(JSON.parse(localStorage.getItem("role")));
  }, []);

  // useEffect(() => {
  //   if (dataSubmitted) {
  //     setActive("QR");
  //     navigate({ pathname: "/qr" });
  //   } else {
  //     setActive("Registration");
  //     navigate({ pathname: "/registration" });
  //   }
  // }, [dataSubmitted]);

  return (
    <div className="header-container">
      <div className="left">
        <Title
          className="card-title"
          level={2}
          onClick={() => {
            navigate({ pathname: "/login" });
          }}
        >
          WareHouse
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
              hidden={role !== item.role}
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
