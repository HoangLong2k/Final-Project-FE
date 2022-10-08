import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getDataSubmitted } from "../../stores/user";

import "./styles.less";

const { Title } = Typography;

const Header = () => {
  const [active, setActive] = useState("Registration");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const NAVBAR = [
    {
      title: "Registration",
      path: "/registration",
    },
    {
      title: "QR",
      path: "/qr",
    },
  ];

  const dataSubmitted = useSelector(({ user }) => {
    return user.dataSubmitted;
  });

  useEffect(() => {
    dispatch(getDataSubmitted());
  }, []);

  useEffect(() => {
    if (dataSubmitted) {
      setActive("QR");
      navigate({ pathname: "/qr" });
    } else {
      setActive("Registration");
      navigate({ pathname: "/registration" });
    }
  }, [dataSubmitted]);

  return (
    <div className="header-container">
      <div className="left">
        <Title
          className="card-title"
          level={2}
          style={{ color: "rgb(255 255 255)" }}
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
