import React, { useRef } from "react";
import { Form, Input, Button, Typography } from "antd";
import Logo from "../../../public/image/Logo.png";
import "./styles.less";
const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const ref = useRef(null);

  const handleClickLogo = () => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    const pageLogo = document.getElementById("img-logo");
    pageLogo.style.height = "30vh";
  };

  return (
    <div className="login-container">
      <div className="img-logo" id="img-logo">
        <img src={Logo} alt="logo" onClick={handleClickLogo} />
      </div>
      <div className="img-container" ref={ref}>
        <div className="img-container-title">
          <Title
            style={{ color: "#1890ff", fontSize: "60px", textAlign: "center" }}
          >
            LUẬN VĂN TỐT NGHIỆP
          </Title>
        </div>

        <div>
          <Title
            style={{ color: "#1890ff", fontSize: "30px", textAlign: "center" }}
            level={3}
          ></Title>
          <Title style={{ color: "#1890ff", textAlign: "center" }} level={3}>
            GVHD: Ths Đinh Quốc Hùng
          </Title>
        </div>
      </div>
      <div className="form-container">
        <Form form={form}>
          <Form.Item name="userName" rules={[]}>
            <Input placeholder={"Tên đăng nhập"} size="large" />
          </Form.Item>
          <Form.Item name="password" rules={[]}>
            <Input placeholder={"Mật khẩu"} type="password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="login-continue-btn"
            >
              {"Đăng nhập"}
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
                Bạn chưa có tài khoản
              </div>
              <Button type="link" className="login-register-btn">
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
