import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import QRCode from "qrcode";
import { getDataSubmitted } from "../../stores/user";

import "./styles.less";
import { Image } from "antd";

const Qr = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState();
  useEffect(() => {
    dispatch(getDataSubmitted());
  }, []);

  const dataSubmitted = useSelector(({ user }) => {
    return user.dataSubmitted[0];
  });

  console.log(dataSubmitted);

  useEffect(() => {
    transform();
  }, [dataSubmitted]);

  const convertData = () => {
    return {
      effectiveDate: dataSubmitted?.effectiveDate,
      idNumber: dataSubmitted?.idNumber,
      owner: dataSubmitted?.owner,
      phoneNumber: dataSubmitted?.phoneNumber,
      timeIn: dataSubmitted?.timeIn,
      timeOut: dataSubmitted?.timeOut,
      trafficNumber: dataSubmitted?.trafficNumber,
      typeOfVehicle: dataSubmitted?.typeOfVehicle,
    };
  };

  const transform = async () => {
    const response = await QRCode.toDataURL(
      JSON.stringify(Object.values(convertData() || {}).join("|"))
    );
    setUrl(response);
  };

  return (
    <div className="qr">
      <div className="qr-description">
        {"Dưới đây là QR code được đăng ký,"}
        <br />
        {"Vui lòng xuất trình mã QR khi ra vào cổng"}
      </div>
      <div className="qr-card-container">
        <div className="qr-card-detail">
          {dataSubmitted && <Image src={url} height="300px" width="300px" />}
        </div>
      </div>
    </div>
  );
};

export default Qr;
