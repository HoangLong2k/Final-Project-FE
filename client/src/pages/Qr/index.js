import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-qr-code";

import "./styles.less";

const Qr = () => {
  const dataSubmitted = useSelector(({ user }) => {
    return user.dataSubmitted;
  });

  return (
    <div className="qr">
      <div className="qr-description">
        {"Dưới đây là QR code được đăng ký,"}
        <br />
        {"Vui lòng xuất trình mã QR khi ra vào cổng"}
      </div>
      <div className="qr-card-container">
        <div className="qr-card-detail">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={Object.values(dataSubmitted || {}).join("|")}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </div>
  );
};

export default Qr;
