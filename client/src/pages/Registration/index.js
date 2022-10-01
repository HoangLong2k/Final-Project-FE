import React, { useState } from "react";
import { Button } from "antd";

import api from "zmp-sdk";

// import QRCode from "react-qr-code";

import "./styles.less";

const Registration = () => {
  const openZaloCamera = () => {
    api.viewQr({
      success: (data) => {
        // xử lý khi gọi api thành công
        console.log(data);
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  };
  return (
    <>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className="login-continue-btn"
        onClick={openZaloCamera}
      >
        {"QR"}
      </Button>
    </>
  );
};

export default Registration;
