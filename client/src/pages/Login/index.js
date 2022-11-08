import React, { useRef, useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Logo from "../../../public/image/Logo.png";
import { logIn, signUp } from "../../stores/user";
import { RoutePaths } from "../../utils/constant";
import "./styles.less";
const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, setRegister] = useState(false);
  const ref = useRef(null);

  const handleClickLogo = () => {
    setTimeout(() => {
      const pageLogo = document.getElementById("img-logo");
      pageLogo.setAttribute("hidden", "true");
    }, 1000);

    setTimeout(() => {
      const formLogin = document.getElementById("form");
      formLogin.style.display = "initial";
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleLogin = (value) => {
    if (register) {
      dispatch(
        signUp({ ...value, role: "user" }, () => {
          navigate(RoutePaths.REGISTRATION);
        })
      );
      return;
    } else {
      dispatch(
        logIn({ ...value, role: "user" }, () => {
          navigate(RoutePaths.REGISTRATION);
        })
      );
      return;
    }
  };

  return (
    <div className="login-container">
      <div className="img-logo" id="img-logo">
        <img src={Logo} alt="logo" onClick={handleClickLogo} />
      </div>
      <div className="img-container" ref={ref}>
        <div className="img-container-title">
          <Title
            style={{
              color: "rgb(65, 84, 102)",
              fontSize: "50px",
              textAlign: "center",
            }}
          >
            LUẬN VĂN TỐT NGHIỆP
          </Title>
        </div>

        <div>
          <Title
            style={{ color: "rgb(65, 84, 102)", textAlign: "center" }}
            level={3}
          >
            GVHD: Ths. Đinh Quốc Hùng
          </Title>
        </div>
      </div>
      <div className="form-container" id="form">
        <Form form={form} onFinish={handleLogin}>
          <Form.Item name="username" rules={[]}>
            <Input placeholder={"Tên đăng nhập"} size="large" />
          </Form.Item>
          <Form.Item name="password" rules={[]}>
            <Input placeholder={"Mật khẩu"} type="password" size="large" />
          </Form.Item>
          {register && (
            <Form.Item name="password" rules={[]}>
              <Input
                placeholder={"Xác nhận mật khẩu"}
                type="password"
                size="large"
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="login-continue-btn"
            >
              {register ? "Đăng ký" : "Đăng nhập"}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" className="login-forgot-btn">
              Quên mật khẩu
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="login-register">
              <div className="login-register-not-user">
                Bạn chưa có tài khoản?
              </div>
              <Button
                type="link"
                className="login-register-btn"
                onClick={() => {
                  setRegister(true);
                }}
              >
                Tạo tài khoản mới
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
